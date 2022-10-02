import React, { useMemo } from "react";
import { getEspeciesByPublisher } from "../selectors/getEspeciesByPublisher";
import EspeciesCard from "./EspeciesCard";

export const EspList = ({ publisher }) => {
  const especies = useMemo(
    () => getEspeciesByPublisher(publisher),
    [publisher]
  );

  return (
    <div className="my-12 mx-auto grid grid-cols-1 gap-5 px-4 sm:gap-8 md:grid-cols-3 md:px-12">
      {especies.map((esp) => (
        <EspeciesCard   key={JSON.stringify(esp)} {...esp} />
      ))}
    </div>
  );
};
