import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getBookListings } from "~/models/book.server";
import { useOptionalAdminUser } from "~/utils";
import { getSeo } from "~/utils/seo";

const [seoMeta, seoLinks] = getSeo({
  title: "Mision Arbol - Libros",
  twitter: {
    title: "Mision Arbol - Libros",
  },
});

export const meta = () => {
  return { ...seoMeta };
};

export const links = () => {
  return [...seoLinks];
};

export const loader = async () => {
  const books = await getBookListings();
  return json({ books });
};

export default function PostsRoute() {
  const { books } = useLoaderData();
  const adminUser = useOptionalAdminUser();
  return (
    <main>
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      <ul className="h-screen">
        <div className="relative px-4 pt-16 pb-20 dark:bg-slate-900 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Libros
              </h2>
            </div>
            <div className="grid gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-3">
              {books.map((book) => (
                <div key={JSON.stringify(book)}>
                  <div className="card-content relative my-0 overflow-hidden rounded-lg border border-gray-300 p-2 transition-all duration-300 hover:border-gray-300 md:border-transparent">
                    <Link className="cursor-pointer rounded-lg" to={book.slug}>
                      <div
                        className="cursor-pointer"
                        style={{ aspectRatio: "1 / 1.6" }}
                      >
                        <div className="h-full w-full">
                          <img
                            src={`/books/${book.imageUrl}`}
                            alt=""
                            className="z-10 h-full w-auto min-w-full object-contain  align-middle opacity-100 transition-opacity"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="card-info absolute left-0 right-0 top-0 flex items-center justify-between p-3">
                      <div className="flex items-stretch"></div>
                      <div>
                        <div className="inline-flex items-center rounded-full border border-transparent bg-white p-1">
                          <svg
                            className=" h-4 w-4"
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="justify-right flex items-center justify-end py-3 dark:text-white">
                    <span className="font-semibold">{book.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ul>
    </main>
  );
}
