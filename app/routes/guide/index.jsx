import React, { useState } from "react";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { especies } from "../../data/especies";
import { EspList } from "../../components/EspList";
import { Tab } from '@headlessui/react'
import { getSeo } from "~/utils/seo";

const [seoMeta, seoLinks] = getSeo({
  title: "Mision Arbol - Guía de Especies",
  twitter: {
    title: "Mision Arbol - Guía de Especies",
  },
});

export const meta = () => {
  return { ...seoMeta };
};

export const links = () => {
  return [...seoLinks];
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const loader = async () => {
  return json({
    data: await especies,
  });
};

export default function Posts() {
  const { data } = useLoaderData();

  let [categories] = useState({
    Forestales: [
      {
        id: 1,
        component: <EspList publisher="Forestales" />,
      },
    ],
    Medicinales: [
      {
        id: 1,
        component: <EspList publisher="Medicinal" />,
      },
    ],
    Ornamentales: [
      {
        id: 1,
        component: <EspList publisher="Ornamentales" />,
      },
    ],
  });
  return (
    <div className="bg-gray-100 dark:bg-[#121f3d]">
      <div className="mx-auto max-w-xl pt-4 text-center">
        <h1 className="mb-5 mt-12 text-6xl font-bold text-gray-600 dark:text-white md:text-7xl">
          Guía de Especies
        </h1>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md bg-yellow-600 shadow">
            <Link
              to="/guide/search"
              className="py-2 px-6 font-bold text-gray-200"
            >
              Buscar
            </Link>
          </div>
        </div>
      </div>
      <div className="px-20 py-16 sm:px-40">
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg bg-white py-2.5 text-sm font-medium leading-5 text-yellow-700 dark:bg-[#24385b] dark:text-white",
                    "ring-white ring-opacity-40 ring-offset-2 ring-offset-yellow-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-yellow-50 shadow dark:bg-[#40587c]"
                      : "text-yellow-400 hover:bg-white "
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel key={idx}>
                {posts.map((post) => (
                  <>{post.component} </>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* ------------ Books Section ------------ */}
    </div>
  );
}
