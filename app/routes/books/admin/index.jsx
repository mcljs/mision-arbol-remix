import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { requireAdminUser } from "../../../session.server";

export const loader = async ({ request }) => {
  await requireAdminUser(request);
  return json({});
};

export default function AdminIndexRoute() {
  return (
    <p>
      <Link to="new" className="text-blue-600 underline">
        Create Nueva publicacion de Libro
      </Link>
    </p>
  );
}