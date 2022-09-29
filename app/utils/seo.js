import { initSeo } from "remix-seo";

export const { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title: "Misión Arbol",
  description: "Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela",
  image: "https://misionarbol.minec.gob.ve/seoInit.jpeg",
  twitter: {
    card: "summary",
    image: "https://misionarbol.minec.gob.ve/seoInit.jpeg",
    creator: "@misionarbolven",
    site: "https://misionarbol.minec.gob.ve/",
    title: "Misión Arbol",
    description: "Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela",
  },
});
