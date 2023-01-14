import { initSeo } from "remix-seo";
import { externalLinks } from "../external-links";

const title = "Misión Arbol";

export const description = {
  en: ["Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela"],
  es: ["Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela"],
};

export let { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title,
  titleTemplate: "%s - @fundamiarbolven",
  description: "Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela",
  additionalLinkTags: [
    {
      rel: 'icon',
      href: `${externalLinks.self}favicon.ico`,
    },
  ],

  twitter: {
    card: "summary_large_image",
    creator: {
      id: "fundamiarbolven",
    },
    site: {
      id: "fundamiarbolven",
    },
  },
  
});
