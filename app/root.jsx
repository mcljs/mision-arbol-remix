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
  useTransition,
} from "@remix-run/react";
import ReactGA from "react-ga";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./styles/style.css";
import { SsrTheme, ThemeMeta, ThemeProvider, useTheme } from "./utils/theme";
import { getThemeSession } from "./utils/theme-session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import Navbar from "./components/Navbar";
import { useSpinDelay } from "spin-delay";
import { NotificationMessage } from "./components/NotificationMessage";
import { Circle } from "./components/Circle";
import Footer from "./components/Footer";

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
          <span className=" truncate text-slate-200">path: {pendingPath}</span>
        </div>
      </div>
    </NotificationMessage>
  );
}

export const links = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
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
  const [theme] = useTheme();
  React.useEffect(() => {
    ReactGA.initialize("G-SG8RM3MQST");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <html lang="en" className={`h-full ${theme ? theme : "dark"}`}>
      <head>
        <Meta />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ThemeMeta />
        <Links />
      </head>
      <body className="duration-50 h-full bg-slate-100  text-slate-900 transition dark:bg-gray-900">
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
