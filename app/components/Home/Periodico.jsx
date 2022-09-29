import React from "react";
import { periodicoData } from "../../data/periodico";
import Link from "../Link";
const Periodico = () => {
  return (
    <>
      <div className="mx-auto grid max-w-screen-md grid-cols-1 gap-5 px-5 pt-20 pb-24 sm:pt-28">
        <div className="mx-auto w-48">
          <img
            src="logo.png"
            alt="logo"
          />
        </div>
        <h1 className="text-center text-2xl font-bold leading-tight dark:text-white sm:text-3xl lg:text-4xl">
          Periódico Digital
        </h1>

        <div>
          <h2 className="border-b border-gray-300 pb-3 text-xs font-semibold uppercase tracking-wider dark:text-white">
            ↓ PUBLICACIONES
          </h2>

          {periodicoData.map((item, index) => {
            return (
              <article className="border-b border-gray-200 py-8" key={index}>
                <h2 className="mt-4 mb-1 text-2xl font-bold leading-tight dark:text-white">
                  {item.title}
                </h2>

                <span className="mb-4 block text-lg font-medium text-green-500">
                  ({item.fecha})
                </span>
                <p className="text-sm text-gray-700 dark:text-[#becde3]">
                  {item.title2}
                </p>
                <Link
                  src={item.ruta}
                  target={"_blank"}
                  className="mt-4 inline-flex transform cursor-pointer items-center justify-center rounded-md bg-green-500 py-2 px-4 font-semibold leading-8 transition-all duration-100 ease-in-out hover:scale-105 hover:bg-green-600"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 512 512"
                    className="mr-1 text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M416 199.5h-91.4V64H187.4v135.5H96l160 158.1 160-158.1zM96 402.8V448h320v-45.2H96z" />
                  </svg>
                  <p className="text-white ">Descargar</p>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Periodico;
