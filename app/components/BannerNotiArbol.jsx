import React from "react";
import Link from "./Link";
const BannerNotiArbol = () => (
  <div className="bg-gray-100 pt-16 pb-12 dark:bg-secondary-900">
    <div id="card" className="">
      <h2 className="text-center   text-4xl dark:text-white xl:text-5xl">
        Ultima Publicación - NOTIÁRBOL
      </h2>

      <div className="w-100 container mx-auto flex flex-col lg:w-4/5">
        <div
          v-for="card in cards"
          className="w-100 mx-2 mt-4 flex
                                        flex-col overflow-hidden rounded-lg bg-white  shadow-xl dark:bg-[#24385b] md:flex-row"
        >
          <div className="h-64 w-auto md:w-1/2">
            <img
              className="inset-0 h-full w-full object-cover object-center"
              src="notiarbol/notiarbol.png"
              alt=""
            />
          </div>
          <div className="flex w-full flex-col justify-between py-10 px-6 text-gray-800">
            <h3 className="text-lg font-semibold leading-tight dark:text-white">
              Edición 019 del periódico NOTIÁRBOL resalta plantación de 16 mil
              árboles en el país por el día internacional contral el cambio
              climático.
            </h3>
            <p className="mt-2 dark:text-white">
              El periódico NotiÁrbol, en su edición Nº 019, decima novena año
              2021, resalta plantación de 16 mil árboles en el país por el día
              internacional contral el cambio climático.
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-[#0791e6]">
              Caracas &bull; 22 de Octubre de 2021
            </p>
            <div className="mr-2 mt-2 inline-block">
              <Link
                to={`https://drive.google.com/file/d/1HHoFBbWfaRfzyxSq42wlAWVEngK5WiJD/view?usp=sharing`}
                target={"_blank"}
              >
                <button
                  type="button"
                  className="flex items-center rounded-md bg-blue-600 py-2.5 px-5 text-sm text-white hover:bg-blue-500 hover:shadow-lg focus:outline-none "
                >
                  <svg
                    className="mr-2 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  Descargar
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Link
          to="/noti-arbol"
          className="mt-4 inline-flex transform cursor-pointer items-center justify-center rounded-md bg-gradient-to-br from-[#95ca3e] to-[#85c638] py-2  px-4 font-semibold leading-8 transition-all duration-100 ease-in-out hover:scale-105 dark:bg-[#98ca3f] "
        >
          <p className="text-white dark:text-[#03091e]">Ver Mas →</p>
        </Link>
      </div>
    </div>
  </div>
);
export default BannerNotiArbol;
