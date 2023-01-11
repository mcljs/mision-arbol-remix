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
  twitter: {
    card: "summary_large_image",
    creator: {
      id: "fundamiarbolven",
    },
    site: {
      id: "fundamiarbolven",
    },
  },
  openGraph: {
    type: "website",
    site_name: "process.env.NEXT_PUBLIC_SITE_TITLE",

    images: [
      {
        url: `${externalLinks.self}seoInit.jpeg`,
        width: 1200,
        height: 630,
        alt: "Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela",
      },
    ],
    
  },
});
