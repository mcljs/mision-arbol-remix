import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useParams,
  useTransition,
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
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "~/models/post.server";
import invariant from "tiny-invariant";
import { requireAdminUser } from "~/session.server";
import { useState } from "react";
import { Field, Input } from "../../../components/FormElements/FormElements";

export const loader = async ({ request, params }) => {
  await requireAdminUser(request);
  invariant(params.slug, "slug is required");
  if (params.slug === "new") {
    return json({});
  }
  const post = await getPost(params.slug);
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
      directory: "public/uploads",
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
    await deletePost(params.slug);
    return redirect("/posts/admin");
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const imageUrl = formData.get("imageUrl");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors = {
    title: title ? null : "Title is required",
    desscription: description ? null : "Description is required",
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
    await createPost({ title, description, slug, imageUrl, markdown });
  } else {
    await updatePost(params.slug, {
      title,
      description,
      slug,
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

  // useEffect(() => {
  //   blah();
  // });

  const transition = useTransition();
  const isCreating = transition.submission?.formData.get("intent") === "create";
  const isUpdating = transition.submission?.formData.get("intent") === "update";
  const isDeleting = transition.submission?.formData.get("intent") === "delete";
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
        id="slugInput"
        placeholder={slug}
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
      {isNewPost && (
        <label
          htmlFor="file-upload"
          className=" mt-5 cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span>Subir imagen</span>
          <input
            id="upload"
            name="upload"
            type="file"
            onChange={changeHandler}
          />
          {image}
        </label>
      )}

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

      <div className="my-5">
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor="markdown"
        >
          Puede usar la
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            className="group relative text-primary-600 underline hover:text-primary-400"
            rel="noreferrer"
          >
            <div className="absolute bottom-2 left-0 right-0 mb-6 -ml-4 -mr-4 flex hidden flex-col items-center group-hover:flex">
              <span className="whitespace-no-wrap relative z-10 rounded-md bg-black p-2 text-xs leading-tight text-white shadow-lg">
                Utilice Markdown simple para dar formato a su texto. Haga clic
                para saber más.
              </span>
              <div className="-mt-2 h-3 w-3 rotate-45 bg-black" />
            </div>
            sintaxis de Markdown para dar formato a su publicación.
          </a>
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <Input
          id="markdown"
          name="markdown"
          defaultValue={data.post?.markdown}
          type="textarea"
        />
      </div>
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

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return (
      <div className="text-red-500">
        Uh oh! The post with the slug "{params.slug}" does not exist!
      </div>
    );
  }
  throw new Error(`Unsupported thrown response status code: ${caught.status}`);
}

export function ErrorBoundary({ error }) {
  if (error instanceof Error) {
    return (
      <div className="text-red-500">
        Oh no, something went wrong!
        <pre>{error.message}</pre>
      </div>
    );
  }
  return <div className="text-red-500">Oh no, something went wrong!</div>;
}
