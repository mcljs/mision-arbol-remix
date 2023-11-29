import {
  Form,
  useActionData,
  useRouteError, isRouteErrorResponse,
  useLoaderData,
  useParams,
  useNavigation,
} from "@remix-run/react";
import {
  redirect,
  json,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import {
  createBook,
  deleteBook,
  getBook,
  updateBook,
} from "../../../models/book.server";
import invariant from "tiny-invariant";
import { requireAdminUser } from "../../../session.server";
import { useState } from "react";
import { Field, Input } from "../../../components/FormElements/FormElements";

export const loader = async ({ request, params }) => {
  await requireAdminUser(request);
  invariant(params.slug, "slug is required");
  if (params.slug === "new") {
    return json({});
  }
  const post = await getBook(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ post });
};

export const action = async ({ request, params }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      avoidFileConflicts: true,
      maxPartSize: 10_000_000,
      directory: "public/books",
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  await requireAdminUser(request);
  invariant(params.slug, "slug is required");
  const intent = formData.get("intent");
  if (intent === "delete") {
    await deleteBook(params.slug);
    return redirect("/books/admin");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");
  const author = formData.get("author");
  const downloadUrl = formData.get("downloadUrl");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors = {
    title: title ? null : "Title is required",
    desscription: description ? null : "Description is required",
    author: author ? null : "Author is required",
    downloadUrl: downloadUrl ? null : "Download Url is required",
    imageUrl: imageUrl ? null : "Url de la imagen es requerida",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  if (params.slug === "new") {
    await createBook({
      title,
      description,
      slug,
      author,
      downloadUrl,
      imageUrl,
      markdown,
    });
  } else {
    await updateBook(params.slug, {
      title,
      description,
      slug,
      author,
      downloadUrl,
      imageUrl,
      markdown,
    });
  }

  return redirect("/posts/admin");
};

export default function NewPostRoute() {
  const data = useLoaderData();
  const errors = useActionData();
  const [image, setImage] = useState(null);
  console.log(image);

  // useEffect(() => {
  //   blah();
  // });

  const transition = useNavigation();
  const isCreating = transition?.formData.get("intent") === "create";
  const isUpdating = transition?.formData.get("intent") === "update";
  const isDeleting = transition?.formData.get("intent") === "delete";
  const isNewPost = !data.post;
  let slug = "";

  const handleChange = (e) => {
    let text = e.target.value;
    // using regex and replace, let's convert spaces to dashes
    slug = text.replace(/\s/g, "-");
    // lets set the value of the slug text box to be our new slug in lowercase
    document.getElementById("slugInput").value = slug.toLowerCase();
  };
  const changeHandler = (e) => {
    if (e.target.files.length > 0) {
      let filename = e.target.files[0].name;
      setImage(filename);
    }
  };

  return (
    <Form
      encType="multipart/form-data"
      method="post"
      key={data.post?.slug ?? "new"}
    >
      <Field
        type="text"
        name="title"
        label="Titulo"
        defaultValue={data.post?.title}
        onChange={handleChange}
        error={errors?.title ? errors.title : null}
      />
      <Field
        type="text"
        name="slug"
        label="Post Slug: (Esto se usa para la url y se genera automaticamente)"
        placeholder={slug}
        id="slugInput"
        defaultValue={data.post?.slug}
        onChange={handleChange}
        error={errors?.slug ? errors.slug : null}
      />
      <Field
        type="text"
        name="description"
        label="Descripcion"
        className="mb-4"
        defaultValue={data.post?.description}
        error={errors?.description ? errors.description : null}
      />
      <Field
        type="text"
        name="author"
        label="Autor"
        defaultValue={data.post?.author}
        error={errors?.author ? errors.author : null}
      />
      <Field
        type="text"
        name="downloadUrl"
        label="Url de descarga"
        defaultValue={data.post?.downloadUrl}
        error={errors?.downloadUrl ? errors.downloadUrl : null}
      />
      <label
        htmlFor="file-upload"
        className=" mt-5 cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
      >
     <span>Subir imagen</span>
        <input id="upload" name="upload" type="file" onChange={changeHandler} />
        {image}
      </label>
      <p>
        <label htmlFor="imageUrl">
          {errors?.imageUrl ? (
            <em className="text-red-600">{errors.imageUrl}</em>
          ) : null}
        </label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          className="sr-only"
          value={image}
          defaultValue={data.post?.imageUrl}
        />
      </p>

      <p className="my-5">

        <Input
          id="markdown"
          name="markdown"
          defaultValue={data.post?.markdown}
          type="textarea"
        />
      </p>
      <div className="flex justify-end gap-4">
        {isNewPost ? null : (
          <button
            type="submit"
            name="intent"
            value="delete"
            className="rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300"
            disabled={isDeleting}
          >
          {isDeleting ? "Borrando..." : "Borrar"}
          </button>
        )}
        <button
          type="submit"
          name="intent"
          value={isNewPost ? "create" : "update"}
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          disabled={isCreating || isUpdating}
        >
            {isNewPost ? (isCreating ? "Creando..." : "Crear Publicacion") : null}
          {isNewPost ? null : isUpdating ? "Modificando..." : "Modificar"}
        </button>
      </div>
    </Form>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const params = useParams(); 
  if (isRouteErrorResponse(error)) {
    // Si el error es un error de ruta (como un 404)
    if (error.status === 404) {
      // Asume que tienes acceso a los parámetros de la ruta como antes
  
      return (
        <div className="text-red-500">
          Uh oh! The post with the slug "{params.slug}" does not exist!
        </div>
      );
    }

    // Para otros códigos de estado de error de ruta
    return (
      <div>
        <h1>Error</h1>
        <p>Status: {error.status}</p>
        <p>{error.statusText || "An error occurred"}</p>
      </div>
    );
  }

  // Manejo de errores que no son específicos de la ruta
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}