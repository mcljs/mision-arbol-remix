import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getPostListings } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";
import { getSeo } from "~/utils/seo";

const [seoMeta, seoLinks] = getSeo({
  title: "Mision Arbol - Noticias",
  twitter: {
    title: "Mision Arbol - Noticias",
  },
});

export const meta = () => {
  return { ...seoMeta };
};

export const links = () => {
  return [...seoLinks];
};

export const loader = async () => {
  const posts = await getPostListings();
  return json({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData();
  const adminUser = useOptionalAdminUser();
  console.log(posts);
  return (
    <main >
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      <ul className="h-screen">
        <div className="relative dark:bg-slate-900 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
         
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Noticias
              </h2>
             
            </div>
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.title}
                  to={post.slug}
                  prefetch="intent"
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover"
                      src={`/uploads/${post.imageUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white dark:bg-slate-800 p-6">
                    <div className="flex-1">
                      <a className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                          {post.title}
                        </p>
                        <p className="mt-3 text-base text-gray-500 dark:text-slate-400 line-clamp-4">
                          {post.description}
                        </p>
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ul>
    </main>
  );
}
