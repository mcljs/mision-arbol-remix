import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { Container } from "./Container";

const reviews = [
  {
    body: "Esta semana la ciudad de Caracas despertó adornada por sus hermosos árboles de Araguaney. Sería genial que cada parroquia, cada esquina o quizás todos los parques tengan sembrado estos árboles que le darían a la ciudad un sentido turístico único ",
    author: "@GerardoValentin",
    rating: 5,
  },
  {
    body: "Hoy cumple años uno de los proyectos más hermosos del Comandante @chavezcandanga: la @misionarbolven, son 16 ya. 🌱",
    author: "@RoiLopezRivas",
    rating: 5,
  },
  {
    body: "Celebramos 16 años de la @misionarbolven una extraordinaria misión que nace con el objetivo de preservar la vida en el planeta y motivar la cultura ecológica. El 5to objetivo histórico del Plan de la Patria se cumple ✊🏿 #16AñosplantandoAmor #VenezuelaContraTANCOL",
    author: "@vargas_mimou",
    rating: 5,
  },
  {
    body: "Desde la Comisión Permanente de Ecosocialismo de la  @Asamblea_Ven acompáñanos en #Aragua la jornada de reforestación de mil árboles 🌲 impulsada por la  @misionarbolven y el  @MinecOficialen el Parque Nacional Henri Pittier 🍃",
    author: "@ramolinap",
    rating: 5,
  },
  {
    body: "@Metrasoficialsigue avanzando en la adecuación del terreno para nuestra Vitrina Agroecológica Productiva en el 23 de enero junto a @misionarbolven @mppau ",
    author: "@Dayitasoy",
    rating: 5,
  },
  {
    body: "¡Cuidar el Planeta es preservar la Vida! Nos encontramos con la vanguardia de la  @misionarbolven para conversar sobre la Organización y Formación en la promoción del Ecosocialismo, impulsando el programa Guardianes del Árbol.",
    author: "@JorgePerezVZLA",
    rating: 5,
  },
  {
    body: "😃🤩🤩🌱🌱🌱🌱🌱",
    author: "@sembremosmasvid",
    rating: 5,
  },
  {
    body: "#EcosocialismoPazayVida ♻️🌱  El @MPV_Monagas y @misionarbolven realizaron llenado de bolsas con sustrato (600), para la siembra de plantas Ornamentales, para futuro embellecimiento. #VenezuelaEnDesarrollo",
    author: "@Ecosoc_PazYVida",
    rating: 5,
  },
  {
    body: "💚💚🇻🇪👏",
    author: "@InparquesVzla",
    rating: 5,
  },
  {
    body: "Sigamos construyendo la Patria Ecosocialista, porque el ecosocialismo es la tendencia",
    author: "@MinecOficial",
    rating: 5,
  },
  {
    body: "Fomentando el amor por el ambiente 🏞️",
    author: "@marielcis01",
    rating: 5,
  },
  {
    body: "Seguimos Construyendo la patria Ecosocialista.!!",
    author: "@UTECDttoCapital",
    rating: 5,
  },
  {
    body: "#EcosocialistasSomosTodos",
    author: "@cegalaguaira",
    rating: 5,
  },
];

function StarIcon(props) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(1).keys()].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            "h-5 w-5",
            rating > index ? "fill-cyan-500" : "fill-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "animate-fade-in rounded-3xl bg-white p-6 opacity-0 shadow-md shadow-gray-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <StarRating rating={rating} />
        <p className="mt-4 text-lg font-semibold leading-6 before:content-['“'] after:content-['”']">
          {title}
        </p>
        <p className="mt-3 text-base leading-7">{body}</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-gray-600 before:content-['–_']">
        {author}
      </figcaption>
    </figure>
  );
}

function splitArray(array, numParts) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef();
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current.offsetHeight);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration }}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef();
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  columns = [columns[0], columns[1], splitArray(columns[2], 2)];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  "md:hidden",
                reviewIndex >= columns[0].length && "lg:hidden"
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100 dark:from-gray-900" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100 dark:from-gray-900" />
    </div>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="pt-20 pb-16 sm:pt-32 sm:pb-24"
    >
      <Container>
        <h2
          id="reviews-title"
          className="text-4xl font-medium tracking-tight text-gray-900 dark:text-slate-100 sm:text-center"
        >
         Amado por el pueblo
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-slate-300 sm:text-center">
        Tweets mas resaltante y menciones
        </p>
        <ReviewGrid />
      </Container>
    </section>
  );
}
