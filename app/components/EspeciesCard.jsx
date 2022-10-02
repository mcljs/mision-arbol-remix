import React from "react";
import Link from "./Link";

const EspeciesCard = ({
  id,
  title,
  title_cientifico,
  caracteristicas_fisicas,
  image,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-[#24385b]">
      <Link to={`/guide/${id}`}>
        <img
          src={`/guide/${image}`}
          className="w-full object-cover object-center md:h-3 lg:h-48"
          alt={title}
        />
      </Link>

      <div className="p-6 ">
        <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-500 dark:text-white">
          {title_cientifico}
        </h2>
        <h1 className="title-font mb-3 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mb-3 leading-relaxed line-clamp-3 dark:text-[#becde3]">
          {caracteristicas_fisicas}
        </p>
        <div className="flex flex-wrap items-center ">
          <Link
            className="dark:text-yellow-1100 inline-flex items-center text-green-800 dark:text-primary-700 md:mb-2 lg:mb-0"
            to={`/guide/${id}`}
          >
            Leer Mas
            <svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EspeciesCard;
