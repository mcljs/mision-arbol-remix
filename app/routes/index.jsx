import { Link, useLoaderData } from "@remix-run/react";
import Calendario from "../components/Home/Calendario";
import VerticesHome from "../components/VerticesHome";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { getSeoMeta } from "~/utils/seo";
import { json } from "@remix-run/node";
import { getPostListings } from "../models/post.server";
import formatDate from "date-fns/format";
import parseISO from "date-fns/parseISO";
import esLocale from "date-fns/locale/es";
import { CallToAction } from "../components/CallToAction";
import { useRef } from "react";
import BannerNotiArbol from "../components/BannerNotiArbol";
import { Reviews } from "../components/Review";
import SkeletonImage from "../components/SkeletonImage";

export const handle = {
  getSitemapEntries() {
    return [
      {
        route: "",
        changefreq: "weekly",
        priority: 1,
      },
    ];
  },
};

export const meta = () => {
  return {
    ...getSeoMeta({
      title: "Misión Árbol",
      description: "Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela",
    }),
    "og:image:alt": "Misión Árbol",
    "twitter:image:alt": "Misión Árbol",
  };
};

export const loader = async () => {
  const posts = await getPostListings();
  return json({ posts });
};

export default function Index() {
  const shouldReduceMotion = useReducedMotion();
  const { posts } = useLoaderData();
  let containerRef = useRef();
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  // order posts by date
  posts.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <motion.div
        initial="initial"
        animate="visible"
        variants={{
          initial: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="relative"
      >
        <div className="mx-auto sm:px-6 lg:px-0">
          <div className="relative shadow-xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                src="/video/VID-20210603-WA0135.mp4"
                type="video/mp4"
              ></video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-500 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-56 lg:px-8">
              <motion.h1
                variants={childVariants}
                className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              >
                <span className=" text-primary-900">Misión</span>
                <span className="text-primary-900"> Árbol</span>
              </motion.h1>
              <motion.p
                variants={childVariants}
                className="mx-auto mt-6 max-w-lg text-center text-xl text-slate-100 sm:max-w-3xl"
              >
                "Comencemos salvando los bosques, salvando las aguas, nuestra
                madre naturaleza"
              </motion.p>
              <motion.p
                variants={childVariants}
                className="mx-auto mt-3   max-w-lg text-center text-xl text-slate-100 sm:max-w-3xl"
              >
                Comandante Hugo Chavéz
              </motion.p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Link
                      to="/posts"
                      className="flex items-center justify-center rounded-md border border-transparent bg-[#98ca3f] px-4 py-3  text-base font-medium text-[#03091e] shadow-sm  hover:bg-[#c1df8b] sm:px-8"
                    >
                      Noticias
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Link
                      to="/"
                      className="flex items-center justify-center rounded-md border border-transparent  bg-[#98ca3f] px-4 py-3 text-base  font-medium text-[#03091e] shadow-sm hover:bg-[#c1df8b] sm:px-8 "
                    >
                      NotiArbol
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Blog section */}
      <div className="relative  py-16 sm:py-24 lg:py-32">
        <div className="relative">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-base font-semibold uppercase tracking-wider text-[#008300] dark:text-green-400">
              Actualidad
            </h2>
            <p className="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-slate-100 sm:text-5xl">
              Ultimas publicaciones
            </p>
          </div>
          <div className="relative mx-10vw">
            <div
              ref={containerRef}
              className="relative mx-auto mt-20 grid max-w-7xl grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6"
            >
              {posts.slice(0, 3).map((post) => (
                <div
                  ref={containerRef}
                  key={JSON.stringify(post)}
                  className="col-span-4 mb-10 animate-fade-in "
                >
                  <Link to={`/posts/${post.slug}`} className="relative w-full">
                    <div className="group peer relative block w-full focus:outline-none">
                      <SkeletonImage
                        className="aspect-h-4 aspect-w-3 rounded-lg transition duration-300 hover:ring-2    hover:ring-secondary-900 hover:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:ring-slate-100   dark:hover:ring-slate-50"
                        img={
                          <img
                            src={`/uploads/${post.imageUrl}`}
                            alt=""
                            className="focus-ring w-full rounded-lg object-cover object-center transition"
                          />
                        }
                      />

                      <div className="mt-8 text-xl font-medium text-slate-800 dark:text-slate-300">
                        {formatDate(parseISO(post.createdAt), "PPP", {
                          locale: esLocale,
                        })}
                      </div>
                      <div className="mt-4 text-2xl font-medium text-black dark:text-white md:text-3xl">
                        {post.title}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-md gap-8 px-4 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:px-8"></div>
        </div>
      </div>
      <CallToAction />

      <BannerNotiArbol />
      <Reviews />

      <VerticesHome />
      <Calendario />
    </>
  );
}
