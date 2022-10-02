import * as React from "react";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useTransition,
} from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles/style.css";
import { SsrTheme, ThemeMeta, ThemeProvider, useTheme } from "./utils/theme";
import { getThemeSession } from "./utils/theme-session.server";
import * as gtag from "./utils/gtags.client";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import Navbar from "./components/Navbar";
import { useSpinDelay } from "spin-delay";
import { NotificationMessage } from "./components/NotificationMessage";
import { Circle } from "./components/Circle";
import Footer from "./components/Footer";
import { getSeo, getSeoMeta } from "./utils/seo";
import { externalLinks } from "./external-links";

let [seoMeta, seoLinks] = getSeo();

export const handle = {
  structuredData() {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Mision Arbol",
        url: externalLinks.self,
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        image: `${externalLinks.self}/seoInit.jpeg`,
        name: "Mision Arbol",
        sameAs: [
          externalLinks.githubSourceCode,
          externalLinks.instagram,
          externalLinks.self,
          externalLinks.twitter,
        ],
        url: externalLinks.self,
        worksFor: {
          "@type": "Organization",
          name: "REWORTH",
        },
      },
    ];
  },
  i18n: ["command-palette", "common", "pages"],
  id: "root",
};

export const meta = () => {
  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    ...seoMeta,
    ...getSeoMeta({
      description: "Misión Árbol. MINEC. Gobierno Bolivariano de Venezuela",
      openGraph: {
        images: [
          {
            alt: "Misión Arbol - @fundamiarbolven",
            image: `${externalLinks.self}/seoInit.jpeg`,
            height: 630,
            width: 1200,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        image: {
          alt: "Misión Arbol - @fundamiarbolven",
          image: `${externalLinks.self}/seoInit.jpeg`,
        },
      },
    }),
  };
};

const LOADER_WORDS = ["Cargando..."];

const ACTION_WORDS = [
  "packaging",
  "zapping",
  "validating",
  "processing",
  "calculating",
  "computing",
  "computering",
];

// we don't want to show the loading indicator on page load
let firstRender = true;

function PageLoadingMessage() {
  const transition = useTransition();
  const [words, setWords] = React.useState([]);
  const [pendingPath, setPendingPath] = React.useState("");
  const showLoader = useSpinDelay(Boolean(transition.state !== "idle"), {
    delay: 400,
    minDuration: 1000,
  });

  React.useEffect(() => {
    if (firstRender) return;
    if (transition.state === "idle") return;
    if (transition.state === "loading") setWords(LOADER_WORDS);
    if (transition.state === "submitting") setWords(ACTION_WORDS);

    const interval = setInterval(() => {
      setWords(([first, ...rest]) => [...rest, first]);
    }, 2000);

    return () => clearInterval(interval);
  }, [pendingPath, transition.state]);

  React.useEffect(() => {
    if (firstRender) return;
    if (transition.state === "idle") return;
    setPendingPath(transition.location.pathname);
  }, [transition]);

  React.useEffect(() => {
    firstRender = false;
  }, []);

  const action = words[0];

  return (
    <NotificationMessage position="bottom-right" visible={showLoader}>
      <div className="flex w-64 items-center">
        <motion.div
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          animate={{ rotate: 360 }}
        >
          <Circle size={48} team="UNKNOWN" />
        </motion.div>
        <div className="ml-4 inline-grid">
          <AnimatePresence>
            <div className="col-start-1 row-start-1 flex overflow-hidden">
              <motion.span
                key={action}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-none text-slate-100"
              >
                {action}
              </motion.span>
            </div>
          </AnimatePresence>
          <span className=" truncate text-slate-200">ruta: {pendingPath}</span>
        </div>
      </div>
    </NotificationMessage>
  );
}

export const links = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
    {
      href: "/posts/rss.xml",
      rel: "alternate",
      type: "application/rss+xml",
      title: "Mision Arbol Noticias RSS Feed",
    },
    {
      href: "/posts.json",
      rel: "alternate",
      type: "application/json",
      title: "Mision Arbol Noticias JSON Feed",
    },
    ...seoLinks,
  ];
};

export const loader = async ({ request }) => {
  const { getTheme } = await getThemeSession(request);
  return json({
    user: await getUser(request),
    theme: getTheme(),
  });
};

function App() {
  const location = useLocation();
  const { gaTrackingId } = useLoaderData();
  const [theme] = useTheme();

  React.useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);
  return (
    <html lang="en" className={`h-full ${theme ? theme : "dark"}`}>
      <head>
        <ThemeMeta />
        <Meta />
        <Links />
      </head>
      <body className="duration-50 h-full bg-slate-100  text-slate-900 transition dark:bg-gray-900">
        {gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=G-VGW41JSE5N`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-VGW41JSE5N', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        <PageLoadingMessage />
        <NotificationMessage queryStringKey="message" delay={0.3} />
        <Navbar />
        <Outlet />
        <SsrTheme serverTheme={!!theme} />
        <ScrollRestoration />
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppProviders() {
  const { theme } = useLoaderData();

  return (
    <ThemeProvider ssrTheme={theme}>
      <App />
    </ThemeProvider>
  );
}
