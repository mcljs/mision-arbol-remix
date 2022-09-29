import React, { useMemo } from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Link from "../../components/Link";
import { especies } from "../../data/especies";
import { getSeoMeta } from "~/utils/seo";



export const meta = ({ data }) => {
  const { keywords = [] } = data.meta ?? {};
  const seoMeta = getSeoMeta({
    title: 'Mision Arbol - Guia',
    description: data.description,
    twitter: {
      description: data.description,
      title: data.title,
    },
  });

  return { ...seoMeta, keywords: keywords.join(", ") };
};

export const getEspById = (id) => {
  return especies.find((esp) => esp.id === id);
};

export const loader = async ({ params }) => {
  return json({
    data: await getEspById(params.id),
  });
};

export default function PostSlug() {
  const { data } = useLoaderData();
  let newText = data.caracteristicas_fisicas.split("\n").map((item, i) => (
    <p style={{ marginBottom: "5px" }} key={i}>
      {item}
    </p>
  ));
  let newPropiedades = data.propiedades.split("\n").map((item, i) => (
    <p className="dark:text-white" style={{ marginBottom: "5px" }} key={i}>
      {item}
    </p>
  ));
  return (
    <section className="bg-cover pt-8 font-sans leading-normal tracking-wider text-gray-900 antialiased dark:bg-[#121f3d]">
      <div className="mx-auto my-32 flex h-auto  max-w-4xl flex-wrap items-center dark:bg-[#121f3d] lg:my-0">
        <div className="shadow-3xl opacity-85 mx-6 w-full rounded-lg bg-white dark:bg-[#121f3d] lg:mx-0 lg:w-3/5 lg:rounded-l-lg lg:rounded-r-none">
          <div className="p-4 text-center md:p-12 lg:text-left">
            <img
              src={data.imageURL}
              className="mx-auto -mt-16  block h-48 w-48 bg-cover bg-center shadow-xl lg:hidden"
              alt="img"
            />
            <span class="mb-2 inline-block rounded-full bg-green-600 py-1 px-2  text-xs font-bold tracking-widest text-white">
              {data.publisher}
            </span>
            <h1 className="pt-8 text-3xl font-bold dark:text-white lg:pt-0">
              {data.title}
            </h1>
            <div className="dark:border-yellow-1100 mx-auto w-4/5 border-b-2 border-green-500 pt-3 opacity-25 dark:opacity-100 lg:mx-0"></div>

            <p className="flex items-center justify-center pt-2 text-xs text-gray-600 dark:text-white lg:justify-start lg:text-sm">
              <svg
                className="h-4 fill-current pr-4 text-green-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>
              <strong>Nombre Científico: </strong>
              {data.title_cientifico}
            </p>

            <p className="pt-8 text-justify text-sm dark:text-white">
              <strong>Características Físicas: </strong>
              <span>{newText}</span>
            </p>
            <p className="pt-8 text-justify text-sm dark:text-white">
              <strong className="dark:text-white">Propiedades: </strong>
              {newPropiedades}
            </p>

            <div className="pt-12 pb-8">
              <Link to="/guide">
                <button className="rounded-full bg-green-700 py-2 px-4 font-bold text-white hover:bg-green-900">
                  Regresar
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <img
            src={data.imageURL}
            className="hidden lg:ml-5 rounded-none shadow-2xl lg:block lg:rounded-lg"
            alt="img"
          />
        </div>
      </div>
    </section>
  );
}
