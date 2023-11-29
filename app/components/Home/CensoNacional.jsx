/* This example requires Tailwind CSS v2.0+ */
import { InboxIcon, SparklesIcon } from "@heroicons/react/outline/index.js";

export default function CensoNacional() {
  return (
    <div className="relative overflow-hidden pt-16 pb-32">
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-[#95ca3e] to-[#85c638]">
                  <InboxIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  CENSO NACIONAL DE VIVEROS
                </h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-slate-200">
                  El Ministerio del Poder Popular Para el Ecosocialismo, a
                  través de la Dirección General de Adaptación y Mitigación del
                  Cambio Climático, Brinda la Bienvenida al Sector Privado y de
                  Libre Emprendimiento a Participar en Nuestro Censo en Línea..
                </p>
                <div className="mt-6">
                  <a
                    target={"_blank"}
                    rel="noopener noreferrer"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSd8OxM7yz4UiGvEmmVk1Q6Jrs6vHaLiHTKLbZqhgxJUGd3ecg/viewform?embedded=true"
                    className="inline-flex rounded-md border border-transparent bg-gradient-to-br from-[#95ca3e] to-[#85c638] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Ingresar
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:block hidden">
            <div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img
                className="w-full  lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="https://misionarbol.minec.gob.ve/static/3251ba49c8265763c2b6a1410b4e4ed0/95332/censo_vivero.webp"
                alt="Inbox user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
