import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getPostListings } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";
import { getSeo,getSeoMeta } from "~/utils/seo";

const [seoMeta, seoLinks] = getSeo({
  title: "Mision Arbol - Noticias",
  twitter: {
    title: "Mision Arbol - Noticias",
  },
});


export const meta = () => {
  // Título base y descripción
  const baseTitle = "Misión Árbol - Noticias";


  // Aplicar el titleTemplate manualmente
  const title = `${baseTitle} - @fundamiarbolven`;

  const seoMetaData = getSeoMeta({
    title: baseTitle, // Pasar el título base a getSeoMeta
    // ... otras configuraciones de SEO si son necesarias ...
  });

  // Convertir el objeto seoMetaData en un arreglo de objetos meta
  const seoMetaArray = Object.entries(seoMetaData).flatMap(([key, value]) => {
    if (typeof value === 'string') {
      return [{ name: key, content: value }];
    } else if (typeof value === 'object' && value !== null) {
      // Para propiedades que son objetos, como openGraph
      return Object.entries(value).map(([innerKey, innerValue]) => {
        return { property: `${key}:${innerKey}`, content: innerValue };
      });
    }
    return [];
  });

  return [
    {  title }, 
    ...seoMetaArray,
    { property: "og:image:alt", content: title },
    { property: "twitter:image:alt", content: title },
  ];
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
                Noticias
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <div key={JSON.stringify(post)}>
                  <Link
                    to={post.slug}
                    className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                  >
                    <div className="flex-shrink-0">
                      <img
                        loading="lazy"
                        className="h-48 w-full object-cover"
                        src={`/uploads/${post.imageUrl}`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-slate-800">
                      <div className="flex-1">
                        <div className="mt-2 block">
                          <p className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500 line-clamp-4 dark:text-slate-400">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ul>
    </main>
  );
}
