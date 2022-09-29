import React from "react";
import HeaderLayout from "../components/HeaderLayout";
import Link from "../components/Link";
import Upload from "./posts/upload";

function nosotros() {
  return (
    <div>
      <HeaderLayout
        heading="Nosotros"
        image="https://res.cloudinary.com/dk5bvgq20/image/upload/v1626942315/assets/vertice-2_gagutx.webp"
      />

      <section className="-mt-24 bg-gray-100 dark:bg-[#0791e6] pb-20">

        <div className="container mx-auto px-4 dark:bg-[#0791e6]">
          <div className="flex flex-wrap dark:bg-[#0791e6]">
            <div className="w-full px-4 pt-6 text-center md:w-4/12 lg:pt-12">
              <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg dark:bg-[#0791e6]"></div>
            </div>

            <div className="w-full px-4 pt-6 text-center dark:bg-[#0791e6] md:w-4/12"></div>
          </div>

          <div className="mt-32 flex flex-wrap items-center">
            <div className="mr-auto ml-auto w-full px-4 dark:bg-[#0791e6] md:w-5/12">
              <h3 className="mb-2 text-3xl font-semibold leading-normal dark:text-white">
                Misión
              </h3>
              <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-gray-800 dark:text-white">
                Somos el ente encargado de contribuir con la construcción de un
                nuevo modelo de desarrollo, fundamentado en la recuperación,
                conservación y uso sustentable de los bosques, el equilibrio
                ecológico y la recuperación de espacios degradados, mediante la
                participación protagónica del Poder Popular, las comunidades
                organizadas y movimientos ambientalistas.
              </p>
            </div>

            <div className="mr-auto ml-auto w-full px-4 dark:bg-[#0791e6] md:w-4/12">
              <div className="">
                <img
                  src="https://res.cloudinary.com/dk5bvgq20/image/upload/v1616366782/assets/jurid_e07bpu.jpg"
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div
          className="pointer-events-none absolute bottom-auto top-0 left-0 right-0 -mt-20 w-full overflow-hidden dark:bg-[#0791e6]"
          style={{ height: "92px", transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden "
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-white dark:text-slate-900"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 md:w-4/12">
              <h3 className="text-3xl font-semibold dark:text-white">Visión</h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-700 dark:text-[#becde3]">
                Ser el ente rector de las políticas públicas destinadas a
                incentivar la conciencia colectiva ecológica sobre la
                importancia de los bosques, el equilibrio ecológico y la
                recuperación de espacios degradados, particularmente en quienes
                habitan en áreas rurales, impulsando una nueva ética
                ambientalista para mejorar la calidad de vida de la población
                venezolana, el rescate y la protección de la flora, así como
                saldar la deuda histórica que la población que tiene con nuestro
                ecosistema.
              </p>
            </div>
            <div className="ml-auto mr-auto mt-16 w-full px-4 sm:mt-0 md:w-5/12">
              <div className="md:pr-12">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20 pb-48">
        <div className="container mx-auto px-4">
          <div className="mb-24 flex flex-wrap justify-center text-center">
            <div className="w-full px-4 lg:w-6/12">
              <h2 className="text-4xl font-semibold dark:text-white">
                Objetivo
              </h2>
              <p className="m-4 text-lg leading-relaxed text-gray-600 dark:text-[#becde3]">
                La Fundación Misión Árbol, es el ente encargado de la
                recolección de semillas, producción de plantas, plantación,
                mantenimiento, recuperación, conservación y uso sustentable de
                los bosques, para el mejoramiento de la calidad de vida de la
                población, el rescate y la protección de la flora, así como
                saldar la deuda histórica que la población tiene con nuestro
                ecosistema, impulsando el reconocimiento de los Derechos
                Ambientales y los Derechos de la Madre Tierra en la Ética de la
                Mujer y el Hombre Nuevo.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-8">
            <li className="rounden-lg flex flex-col items-center overflow-hidden">
              <div className="w-48 overflow-hidden rounded-lg sm:w-64">
                <img
                  alt="..."
                  src="https://pbs.twimg.com/profile_images/1037101550571806722/zYacZcEJ_400x400.jpg"
                  className="h-full w-full bg-gray-100"
                  style={{ position: "relative", overflow: "hidden" }}
                />
              </div>
              <div className="mt-4 p-0 text-center sm:mt-0 sm:p-8">
                <h1 className="text-xl font-bold dark:text-white">
                  Wilmer Vásquez Mateus
                </h1>
                <h2 className="text-yellow-1100 my-3 text-xs uppercase tracking-wider">
                  PRESIDENTE DE LA FUNDACIÓN MISIÓN ÁRBOL
                </h2>
                <Link to="https://twitter.com/wilmervasquezm?lang=es">
                  <button
                    className="mt-4 inline-flex cursor-pointer items-center rounded-md bg-gray-200 px-3 py-2 dark:bg-[#132035]"
                    type="button"
                  >
                    <svg
                      class="mr-1 text-[#1d9bf0]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
                      </g>
                    </svg>{" "}
                    <span className="dark:text-white">Twitter</span>{" "}
                  </button>
                </Link>
              </div>
            </li>

            <li className="rounden-lg flex flex-col items-center overflow-hidden">
              <div className="w-48 overflow-hidden rounded-lg sm:w-64">
                <img
                  alt="..."
                  src="../images/9812.jpeg"
                  className="h-full w-full bg-gray-100"
                  style={{ position: "relative", overflow: "hidden" }}
                />
              </div>
              <div className="mt-4 p-0 text-center sm:mt-0 sm:p-8">
                <h1 className="text-xl font-bold dark:text-white">
                  Josué Alejandro Lorca Vega
                </h1>
                <h2 className="text-yellow-1100 my-3 text-xs uppercase tracking-wider">
                  MINISTRO DEL PODER POPULAR PARA EL ECOSOCIALISMO
                </h2>
                <Link to="https://twitter.com/JosueLorca">
                  <button
                    className="mt-4 inline-flex cursor-pointer items-center rounded-md bg-gray-200 px-3 py-2 dark:bg-[#132035]"
                    type="button"
                  >
                    <svg
                      class="mr-1 text-[#1d9bf0]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
                      </g>
                    </svg>{" "}
                    <span className="dark:text-white">Twitter</span>{" "}
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default nosotros;
