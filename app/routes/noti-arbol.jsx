import React from "react";
import Periodico from "../components/Home/Periodico";
import { getSeo, getSeoMeta } from "~/utils/seo";

const [seoMeta, seoLinks] = getSeo({
  title: "Mision Arbol - Notiarbol",
  twitter: {
    title: "Mision Arbol - Notiarbol",
  },
});

export const meta = () => {
  const baseTitle = "Mision Arbol - Notiarbol";

  const title = `${baseTitle} `;

  const seoMetaData = getSeoMeta({
    title: baseTitle,
  });

  const seoMetaArray = Object.entries(seoMetaData).flatMap(([key, value]) => {
    if (typeof value === "string") {
      return [{ name: key, content: value }];
    } else if (typeof value === "object" && value !== null) {
      return Object.entries(value).map(([innerKey, innerValue]) => {
        return { property: `${key}:${innerKey}`, content: innerValue };
      });
    }
    return [];
  });

  return [
    { title },
    ...seoMetaArray,
    { property: "og:image:alt", content: title },
    { property: "twitter:image:alt", content: title },
  ];
};

export const links = () => {
  return [...seoLinks];
};

const NotiArbol = () => (
  <div>
    <Periodico />
  </div>
);
export default NotiArbol;
