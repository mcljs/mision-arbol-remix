import { Link, Outlet, useLoaderData, Form, NavLink } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getBookListings } from "../../models/book.server";
import { useUser } from "../../utils";

export const loader = async () => {
  return json({ books: await getBookListings() });
};

export default function AdminRoute() {
  const { books } = useLoaderData();
  const user = useUser();
  return (
    <>
      <div className="flex h-full min-h-screen flex-col">
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
          <h1 className="text-3xl font-bold">
            <Link to=".">Publicaciones</Link>
          </h1>
          <p>{user.email}</p>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Salir de la sesión
            </button>
          </Form>
        </header>

        <main className="flex h-full bg-white">
          <div className="h-full w-80 border-r bg-gray-50">
            <Link to="new" className="block p-4 text-xl text-blue-500">
              + Nueva Publicacion
            </Link>

            <hr />

            {books.length === 0 ? (
              <p className="p-4">No post yet</p>
            ) : (
              <ol>
                {books.map((post) => (
                  <li key={post.slug}>
                    <NavLink
                      className={({ isActive }) =>
                        `block border-b p-4 text-xl ${
                          isActive ? "bg-white" : ""
                        }`
                      }
                      to={post.slug}
                    >
                      📝 {post.title}
                    </NavLink>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <div className="text-red-500">
      Oh no, something went wrong!
      <pre>{error.message}</pre>
    </div>
  );
}
