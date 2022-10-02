import { marked } from "marked";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";
import { getSeoMeta } from "~/utils/seo";
import formatDate from "date-fns/format";
import parseISO from "date-fns/parseISO";
import esLocale from "date-fns/locale/es";
import Link from "../../components/Link";
import SkeletonImage from "../../components/SkeletonImage";

export const meta = ({ data }) => {
  return {
    ...getSeoMeta({
      title: data.title,
      description: data.description,
      openGraph: {
        images: [
          {
            alt: "Misión Arbol - @fundamiarbolven",
            image: `https://misionarbol.minec.gob.ve/uploads/${data.imageUrl}`,
            height: 630,
            width: 1200,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        image: {
          alt: data.title,
          image: `https://misionarbol.minec.gob.ve/uploads/${data.imageUrl}`,
        },
      },
    }),
    "og:image": `https://misionarbol.minec.gob.ve/uploads/${data.imageUrl}`,
    "og:image:alt": data.title,
    "article:published_time": new Date(data.createdAt).toISOString(),
    "article:modified_time": new Date(data.updatedAt).toISOString(),
  };
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
            {formatDate(parseISO(createdAt), "PPP", { locale: esLocale })}
          </p>
          <h1 className="mx-auto max-w-screen-md  px-4 text-4xl font-semibold leading-relaxed text-gray-800 dark:text-white lg:px-0">
            {title}
          </h1>
        </div>

        <figure>
          <SkeletonImage
            className="my-4 mx-auto w-full max-w-screen-md rounded-lg lg:px-0 px-4"
            img={
              <img
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
          className="prose prose-lg prose-indigo mx-auto mt-6 px-4 pb-20 text-secondary-700 dark:prose-invert dark:text-white lg:px-0"
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
              href={`https://twitter.com/intent/tweet?url=https://misionarbol.minec.gob.ve/posts/${slug}`}
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
