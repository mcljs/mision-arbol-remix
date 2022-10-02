import React from "react";

function Calendario() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-50">
                Calendario Ecosocialista Octubre 2022
              </h2>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">01.</span>-Día Mundial del Hábitat
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">04.</span>-Día Mundial de los Animales
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">05.</span>-Día Interamericano del Agua
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">12.</span>-Día de la Resistencia Indígena
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">12.</span>-Día Internacional para la Resolución de
Desastres Naturales
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">16.</span>-Día Mundial de la Alimentación
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">18.</span>-Día de la Protección a la Naturaleza
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">21.</span>-Día Mundial del Ahorro Energético
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">26.</span>-Día Mundial de Información sobre
Desarrollo
              </p>
              <p className="mt-4 text-gray-600 dark:text-slate-200">
                <span className="text-slate-900 dark:text-slate-300">29.</span>-Día de la Semillas Campesina
              </p>
              <a
                href="https://drive.google.com/file/d/19cog2N9LxE93-sD85pPV8EakNNZLCmia/view"
                target={`_blank`}
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-md border border-transparent btn-Green px-4 py-2 text-sm font-medium text-white dark:text-slate-900 shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Descargar
              </a>
            </div>
            <div className="aspect-w-7 aspect-h-8 overflow-hidden rounded-lg bg-gray-100">
              <img
                src="/calendario.jpg"
                alt=""
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendario;
