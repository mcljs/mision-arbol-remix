import React from "react";
import Link from "./Link";
const BannerNotiArbol = () => (
  <>
    <div className="relative mx-10vw">
      <div className="relative mt-16 mx-auto grid max-w-7xl grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="col-span-full mb-16 flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
          <div className="space-y-2 lg:space-y-0">
            <h2 className="text-3xl leading-tight text-black dark:text-white md:text-4xl">
              Notiarbol
            </h2>
            <p className="text-3xl leading-tight text-gray-600 dark:text-slate-300 md:text-4xl">
              Preparada especialmente para ti.
            </p>
          </div>
          <Link
            className="text-primary inline-flex cursor-pointer items-center text-left font-medium transition focus:outline-none"
            to="/noti-arbol"
          >
            <span className="mr-8 text-xl font-medium dark:text-white">
              Ver todos los notiarbol
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-12 w-12 text-primary-500"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
    <div className="relative pt-6 pb-12">
      <div className="mx-auto max-w-7xl bg-primary-900 lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <img
                  className="rounded-3xl object-cover object-center shadow-2xl"
                  src="notiarbol/notiarbol.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="relative bg-primary-900 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
            <div
              className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute bottom-full left-full translate-y-1/3 -translate-x-2/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-secondary-700"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
              <svg
                className="absolute top-full -translate-y-1/3 -translate-x-1/3 transform xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-secondary-700"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md space-y-6 py-12 px-4 sm:max-w-3xl sm:py-16 sm:px-6 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
              <h2
                className="text-3xl font-bold tracking-tight text-white"
                id="join-heading"
              >
                Edición 019 del periódico NOTIÁRBOL resalta plantación de 16 mil
                árboles en el país por el día internacional contral el cambio
                climático.
              </h2>
              <p className="text-lg text-white">
                El periódico NotiÁrbol, en su edición Nº 019, decima novena año
                2021, resalta plantación de 16 mil árboles en el país por el día
                internacional contral el cambio climático.
              </p>
              <p className="text-lg text-slate-100">
                Caracas &bull; 22 de Octubre de 2021
              </p>
              <Link
                className="block w-full rounded-md border border-transparent bg-white py-3 px-5 text-center text-base font-medium text-secondary-900 shadow-md hover:bg-gray-50 sm:inline-block sm:w-auto"
                to={`https://drive.google.com/file/d/1HHoFBbWfaRfzyxSq42wlAWVEngK5WiJD/view?usp=sharing`}
                target={"_blank"}
              >
                Descargar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default BannerNotiArbol;
