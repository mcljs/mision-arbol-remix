import React from 'react'
import Periodico from '../components/Home/Periodico'
import { getSeo } from "~/utils/seo";

const [seoMeta, seoLinks] = getSeo({
  title: "Mision Arbol - Notiarbol",
  twitter: {
    title: "Mision Arbol - Notiarbol",
  },
});

export const meta = () => {
  return { ...seoMeta };
};

export const links = () => {
  return [...seoLinks];
};


const NotiArbol = (  ) => (
  <div>

    <Periodico />
   </div>

)
export default NotiArbol