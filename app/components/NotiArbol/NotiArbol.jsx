import React from "react";
import { periodicoData } from "../../data/periodico";

function NotiArbol() {
  return (
      <>
      <h2 className="text-base text-center font-semibold uppercase tracking-wider text-green-600">NOTIARBOL</h2>
    <section className="noticias">
      <div className="wrap">
        <div className="listado mx-auto px-12 pt-12">
          {periodicoData.slice(2, 5).map((noticia, i) => (
            <article key={i} className="noticia text-white">
              <header className="py-3 font-bold text-white">
                <time dateTime={noticia.fecha}>{noticia.fecha1}</time>
                <h4>
                  <a
                    href="https://blog.patria.org.ve/bono-revolucionar-permanente/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Bono Revolucionar Permanente"
                  >
                    {noticia.title}
                  </a>
                </h4>
              </header>
            </article>
          ))}

          <footer>
            <button
              type="button"
              className="mt-8 inline-flex items-center rounded-md border border-transparent bg-slate-50 px-4 py-2 text-base font-medium text-slate-900 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Ver más
            </button>
          </footer>
        </div>
        <article className="noticia-imagen noticia1 bg-gray-200 dark:bg-slate-900">
          <header>
            <div className="imgcont px-8">
              <div className="imgwrapper">
                <img
                  src="https://misionarbol.minec.gob.ve/static/5840a3b4d18c1c63d4adb05fbc81a3ba/7ca0e/notiarbol.webp"
                  alt=""
                  className="rounded-lg w-80"
                />
              </div>
            </div>
          </header>
          <p className="mt-4 max-w-md px-8 text-left text-slate-900 dark:text-slate-100">
            En aras de profundizar la arquitectura financiera del Poder Popular,
            el presidente de la República, Nicolás Maduro, reiteró la necesidad
            de fortalecer los Bancos Comunales en cada comuna y consejo comunal
            del territorio nacional.
          </p>
          <footer className="mt-3 px-8">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-base font-medium  shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 text-[#03091e] bg-[#98ca3f] hover:bg-[#c1df8b]"
            >
              Ver más
            </button>
          </footer>
        </article>

        <article className="noticia-imagen2 lg:table-cell sm:table-cell noticia2 hidden bg-gray-200 dark:bg-slate-900">
          <header>
            <div className="imgcont px-8">
              <div className="imgwrapper">
                <img
                  src="https://misionarbol.minec.gob.ve/static/5840a3b4d18c1c63d4adb05fbc81a3ba/7ca0e/notiarbol.webp"
                  alt=""
                  className="rounded-lg w-80"
                />
              </div>
            </div>
          </header>
          <p className="mt-4 max-w-md px-8 text-left text-slate-900 dark:text-slate-100">
            En aras de profundizar la arquitectura financiera del Poder Popular,
            el presidente de la República, Nicolás Maduro, reiteró la necesidad
            de fortalecer los Bancos Comunales en cada comuna y consejo comunal
            del territorio nacional.
          </p>
          <footer className="mt-3 px-8">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-base font-medium  shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 text-[#03091e] bg-[#98ca3f] hover:bg-[#c1df8b]"
            >
              Ver más
            </button>
          </footer>
        </article>

      </div>
    </section>
    </>
  );
}

export default NotiArbol;
