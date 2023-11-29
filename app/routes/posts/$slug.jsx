import { marked } from "marked";
import { json } from "@remix-run/node";
import {useRouteError,isRouteErrorResponse, useLoaderData, useParams } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";
import { getSeoMeta } from "~/utils/seo";
import { formatDate } from "../../utils/misc";
import Link from "../../components/Link";
import SkeletonImage from "../../components/SkeletonImage";

export const meta = ({ data }) => {
  const title = `${data.title}`;
  const description = data.description;

  const seoMetaData = getSeoMeta({
    title: data.title, 
    description,
    openGraph: {
      images: [
        {
          alt: data.title,
          url: `https://misionarbol.minec.gob.ve/uploads/${data.imageUrl}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      image: {
        alt: data.title,
        url: `https://misionarbol.minec.gob.ve/uploads/${data.imageUrl}`,
      },
    },
  });

  const seoMetaArray = Object.entries(seoMetaData).flatMap(([key, value]) => {
    if (typeof value === 'string') {
      return [{ name: key, content: value }];
    } else if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([innerKey, innerValue]) => {
        return { property: `${key}:${innerKey}`, content: innerValue };
      });
    }
    return [];
  });

  return [
    { title }, 
    ...seoMetaArray,
    { property: "twitter:image:alt", content: title },
    { property: "og:image:width", content: "1200" }, 
    { property: "og:image:height", content: "630" }, 
    { property: "article:published_time", content: new Date(data.createdAt).toISOString() },
    { property: "article:modified_time", content: new Date(data.updatedAt).toISOString() },
  ];
};

export const loader = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug is required");
  const post = await getPost(slug);

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const html = marked(post.markdown);
  return json({
    title: post.title,
    imageUrl: post.imageUrl,
    description: post.description,
    slug: post.slug,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    html,
  });
};

export default function PostRoute({ twitterHandle }) {
  const { title, imageUrl, slug, createdAt, html } = useLoaderData();
  return (
    <>
      <main className="pt-8 pb-4 dark:bg-[#121f3d]">
        <div className="mt-10 sm:mt-24 ">
          <p
            className="mx-auto mb-5 max-w-screen-md px-4 text-lg italic leading-relaxed text-gray-500 dark:text-[#becde3] lg:px-2 
"
          >
            {formatDate(createdAt)}
          </p>
          <h1 className="mx-auto max-w-screen-md  px-4 text-4xl font-semibold leading-relaxed text-gray-800 dark:text-white lg:px-0">
            {title}
          </h1>
        </div>

        <figure>
          <SkeletonImage
            className="my-4 mx-auto w-full max-w-screen-md rounded-lg px-4 lg:px-0"
            img={
              <img
                loading="lazy"
                className="rounded-lg"
                src={`/uploads/${imageUrl}`}
                alt=""
                width={1310}
                height={873}
              />
            }
          />
        </figure>
        <div
          className="prose prose-lg prose-indigo mx-auto mt-6 px-4 pb-20 text-secondary-700 dark:text-white dark:prose-invert lg:px-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <img
          src="https://res.cloudinary.com/dk5bvgq20/image/upload/v1616366412/assets/Eslogan_de_Misi%C3%B3n_%C3%81rbol_PNG_jcegjs.png"
          alt="Eslogan"
          className="mx-auto w-24 pt-7"
        />

        <div className="mx-auto mb-8 flex max-w-screen-lg flex-col items-center justify-center py-14 px-7">
          <h2 className="text-center text-xl font-bold leading-tight dark:text-white sm:text-2xl">
            Comparte este artículo con tus amigos
          </h2>
          <div className="mt-4 flex flex-wrap items-center justify-center">
            <Link
              target="_blank"
              href={`https://twitter.com/intent/tweet?url=https://misionarbol.minec.gob.ve/posts/${slug}/`}
              className="m-1 flex items-center rounded-lg bg-gray-100 py-2 px-3 leading-6 transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:bg-[#132035]"
            >
              <svg
                className="mr-1 text-blue-700"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
                </g>
              </svg>
              <span className="dark:text-white">Tweet</span>
            </Link>
          </div>
        </div>
      </main>
    </>
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