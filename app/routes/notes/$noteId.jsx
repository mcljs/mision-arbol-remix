import { json, redirect } from "@remix-run/node";
import { Form,  useRouteError, isRouteErrorResponse , useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteNote, getNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ userId, id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
};

export const action = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ userId, id: params.noteId });

  return redirect("/notes");
};

export default function NoteDetailsPage() {
  const data = useLoaderData();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.note.title}</h3>
      <p className="py-6">{data.note.body}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // Aquí manejas los errores específicos de las rutas, como un error 404
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>Note not found</div>;
    }

    // Aquí puedes manejar otros códigos de estado específicos
    // Por ejemplo, un error 500
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.statusText || 'An unexpected error occurred.'}</p>
      </div>
    );
  }

  // Manejo de errores generales de JavaScript que no son específicos de la ruta
  let errorMessage = "Unknown error";
  if (error instanceof Error) {
    console.error(error);
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