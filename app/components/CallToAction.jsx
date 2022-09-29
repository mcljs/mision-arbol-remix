import { CircleBackground } from "./CircleBackground";
import { Container } from "./Container";

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-secondary-900 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            CENSO NACIONAL DE VIVEROS
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            El Ministerio del Poder Popular Para el Ecosocialismo, a través de
            la Dirección General de Adaptación y Mitigación del Cambio
            Climático, Brinda la Bienvenida al Sector Privado y de Libre
            Emprendimiento a Participar en Nuestro Censo en Línea..
          </p>
          <div className="mt-8 flex justify-center">
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
      </Container>
    </section>
  );
}
