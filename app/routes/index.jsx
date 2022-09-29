import { Link, useLoaderData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import Calendario from "../components/Home/Calendario";
import CensoNacional from "../components/Home/CensoNacional";
import NotiArbol from "../components/NotiArbol";
import VerticesHome from "../components/VerticesHome";
import { motion, useReducedMotion } from "framer-motion";
import { getSeo, getSeoMeta } from "~/utils/seo";
import { json } from "@remix-run/node";
import { getPostListings } from "../models/post.server";
import formatDate from "date-fns/format";
import parseISO from "date-fns/parseISO";
import esLocale from 'date-fns/locale/es';

const [seoMeta, seoLinks] = getSeo();

export const meta = () => {
  return {
    ...seoMeta,
    ...getSeoMeta({
      openGraph: {
        images: [
          {
            alt: "Mision Arbol",
            url: `https://misionarbol.minec.gob.ve/seoInit.jpeg`,
            height: 630,
            width: 1200,
          },
        ],
        type: "website",
        openGraph: {
          images: [
            {
              alt: "Mision Arbol",
              url: `https://misionarbol.minec.gob.ve/seoInit.jpeg`,
              height: 630,
              width: 1200,
            },
          ],
          type: "website",
        },
      },
    }),
  };
};

export const links = () => {
  return [...seoLinks];
};

export const loader = async () => {
  const posts = await getPostListings();
  return json({ posts });
};

export default function Index() {
  const user = useOptionalUser();
  const shouldReduceMotion = useReducedMotion();
  const { posts } = useLoaderData();

  const childVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
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
                <span className=" text-primary">Misión</span>
                <span className="text-primary"> Árbol</span>
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
            <h2 className="text-base font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              Actualidad
            </h2>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">
              Ultimas publicaciones
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-md gap-8 px-4 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:px-8">
            {posts.map((post) => (
              <>
                <div key={post.slug} className="relative w-full">
                  <div className="group peer relative block w-full focus:outline-none">
                    <div className="aspect-h-4 aspect-w-3 rounded-lg">
                      <img
                        className="focus-ring w-full rounded-lg object-cover object-center transition"
                        src={`/uploads/${post.imageUrl}`}
                        alt=""
                      />
                    </div>
                    <div className="text-slate-800 dark:text-slate-300 mt-8 text-xl font-medium">
                      {formatDate(parseISO(post.createdAt), "PPP", { locale: esLocale })}
                    </div>
                    <div className="mt-4 text-2xl font-medium text-black dark:text-white md:text-3xl">
                      {post.title}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <CensoNacional />
      <NotiArbol />
      <VerticesHome />
      <Calendario />

      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg"
                  alt="Sonic Youth On Stage"
                />

                <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
              </div>
              <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="block uppercase text-yellow-500 drop-shadow-md">
                    Indie Stack
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                  Check the README.md file for instructions on how to get this
                  project deployed.
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  {user ? (
                    <Link
                      to="/notes"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      View Notes for {user.email}
                    </Link>
                  ) : (
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <Link
                        to="/join"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
                <a href="https://remix.run">
                  <img
                    src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                    alt="Remix"
                    className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl text-center">
            <Link to="/posts" className="text-xl text-blue-600 underline">
              Blog Posts
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
