import { marked } from "marked";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { getBook } from "../../models/book.server";
import invariant from "tiny-invariant";
import { getSeoMeta } from "../../utils/seo";

export const meta = ({ data, parentsData }) => {
  return {
    ...getSeoMeta({
      title: data.title,
      description: data.description,
      openGraph: {
        type: "article",
      },
    }),
    "twitter:image": `https://misionarbol.minec.gob.ve/books/${data.imageUrl}`,
    "og:image": `https://misionarbol.minec.gob.ve/books/${data.imageUrl}`,
    "og:image:alt": data.title,
    "twitter:image:alt": data.title,
    "article:published_time": new Date(data.createdAt).toISOString(),
    "article:modified_time": new Date(data.updatedAt).toISOString(),
  };
};

export const loader = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug is required");
  const book = await getBook(slug);

  if (!book) {
    throw new Response("Not Found", { status: 404 });
  }
  const html = marked(book.markdown);
  return json({
    title: book.title,
    imageUrl: book.imageUrl,
    author: book.author,
    slug: book.slug,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    html,
  });
};

export default function BookRoute() {
  const { title, imageUrl, author, html } = useLoaderData();
  return (
    <>
      <main className="pt-8 pb-4 dark:bg-[#121f3d]">
        <div className="container relative mx-auto mb-8 max-w-7xl px-4 lg:mb-0  ">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="flex justify-center py-4">
                <div className="relative table-cell text-center align-middle">
                  <img
                    className="rounded-lg object-cover"
                    src={`/books/${imageUrl}`}
                    alt=""
                    width={1310}
                    height={873}
                  />
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="mb-8 inline-flex w-full flex-col items-start justify-start rounded-3xl bg-white px-6 py-6 shadow-sm  dark:bg-secondary-900 sm:px-12 sm:py-10">
                <div className="mb-4 space-x-2">
                  <div className="flex inline-flex h-[26px] items-center rounded border border-secondary-900 bg-white px-2 py-1 align-middle dark:bg-black">
                    <span>
                      <svg
                        className="h-5 w-5 stroke-slate-900  text-secondary-900 dark:stroke-slate-100  dark:text-slate-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="mx-2 text-sm font-semibold leading-normal text-gray-900 dark:text-slate-100">
                      Libro
                    </span>
                  </div>
                </div>
                <h2 className="mb-2 font-serif text-4xl font-bold leading-10 dark:text-slate-100">
                  {title}
                </h2>
                <div className="xs:flex-row xs:space-x-2 xs:space-y-0 mb-4 inline-flex flex-col space-y-2">
                  <div className="inline-flex items-center space-x-2 align-middle">
                    <span className="text-[10px] font-semibold uppercase text-secondary-500 dark:text-secondary-100">
                      Author
                    </span>
                    <div className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs">
                      {author}
                    </div>
                  </div>
                </div>
                <p className="mb-2  whitespace-pre-line text-sm leading-normal text-secondary-500 dark:text-secondary-100">
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </p>
                <div className="space-y-4">
                  <div className="xs:space-x-4 xs:flex-row flex flex-col-reverse">
                    <div className>
                      <button
                        type="button"
                        className=" inline-flex items-center rounded-md border-2 border-transparent bg-primary-500 px-6 py-3 text-base font-medium  text-secondary-900 shadow-sm transition duration-300 hover:bg-primary-200  hover:ring-2    hover:ring-primary-500 hover:ring-offset-2 focus:outline-none disabled:opacity-50   disabled:ring-primary-500"
                      >
                        <div
                          className="-ml-0.5  mr-3 h-5 w-5"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-5"
                            viewBox="0 0 17 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.3335 7.33333V1.5L1.8335 10.6667H7.66683L7.66683 16.5L15.1668 7.33333L9.3335 7.33333Z"
                              stroke="#111827"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
