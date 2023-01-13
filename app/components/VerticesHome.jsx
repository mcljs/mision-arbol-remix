import { useId } from "react";
import { Container } from "./Container";

const features = [
  {
    name: "Territorialización de la preservación a través del poder popular ",
    description:
      "Expandir y consolidar los planes, programas y proyectos de la Misión Árbol nivel Internacional y nacional, promoviendo el empoderamiento, formación y vinculación del Poder Popular, niños, niñas y jóvenes en acciones ambientales.",
    icon: "/vertices/vertice1.png",
  },
  {
    name: "Preservación y conservación de la vida y el futuro",
    description:
      "Desarrollo de planes, programas y proyectos para la protección, conservación, recuperación y restauración de nuestras zonas boscosas en pro de garantizar el equilibrio ecológico del planeta.",
    icon: "/vertices/vertice2.png",
  },
  {
    name: "Desarrollo sustentable y hábitat sostenible",
    description:
      "Contribuir al desarrollo sustentable/sostenible mediante acciones productivas, científicas, económicas, sociales, que garanticen el uso equilibrado de los recursos naturales, combatir la crisis climática y proteger los Derechos de la Madre Tierra.",
    icon: "/vertices/vertice3.png",
  },
];

export default function VerticesHome() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-slate-100">
            Vertices
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 bg-white p-8 dark:bg-secondary-900"
            >
              <img
                loading="lazy"
                src={feature.icon}
                className="h-12 w-12"
                alt=""
              />
              <h3 className="mt-6 font-semibold text-gray-900 dark:text-slate-100">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-700 dark:text-secondary-200">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
