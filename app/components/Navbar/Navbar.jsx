import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { AnnotationIcon, ChatAlt2Icon, XIcon } from "@heroicons/react/outline";
import Link from "../Link";
import { useOptionalUser } from "../../utils";
import clsx from "clsx";
import { ClientOnly } from "../client-only";
import ThemeToggle, { SsrPlaceholder } from "../theme-toggle";
import { NavLinks } from "./NavLinks";
import { Container } from "../Container";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Noticias",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/posts",
    icon: AnnotationIcon,
  },
  {
    name: "Notiarbol",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "/noti-arbol",
    icon: AnnotationIcon,
  },
  {
    name: "Nosotros",
    description: "Your customers' data will be safe and secure.",
    href: "/nosotros",
    icon: ChatAlt2Icon,
  },
  {
    name: "Biblioteca",
    description: "Your customers' data will be safe and secure.",
    href: "/books",
    icon: ChatAlt2Icon,
  },
  {
    name: "Guia de especies",
    href: "/guide",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavLink({ children, ...props }) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700 dark:text-slate-100"
      {...props}
    >
      {children}
    </Popover.Button>
  );
}

function Navbar() {
  const user = useOptionalUser();

  let [isOpaque, setIsOpaque] = React.useState(false);

  React.useEffect(() => {
    let offset = 50;
    function onScroll() {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true);
      } else if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false);
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [isOpaque]);

  return (
    <>
      <header
        className={clsx(
          "sticky  top-0 z-40 w-full flex-none backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] lg:z-50 lg:border-b lg:border-slate-900/10",
          isOpaque
            ? "bg-slate-100 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
            : "bg-slate-100/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
        )}
      >
        <nav>
          <Container className="relative z-50 flex justify-between py-8">
            <div className="relative z-10 flex items-center gap-16">
              <Link prefetch="intent" to="/">
                <img
                  loading="lazy"
                  className="-mt-6"
                  alt="Logo"
                  src="https://res.cloudinary.com/mcljs/image/upload/c_fit,w_1180,ar_4:3,q_auto,f_auto/v1673497155/logo_bi7dle"
                  sizes="(max-width: 639px) 80vw, (min-width: 640px) and (max-width: 1499px) 50vw, (min-width: 1500px) and (max-width: 1620px) 25vw, 410px"
                  crossOrigin="anonymous"
                  width={71}
                  height={53}
                />
              </Link>
              <div className="hidden lg:flex lg:gap-10">
                <NavLinks />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Popover className="lg:hidden">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 dark:stroke-slate-50 [&:not(:focus-visible)]:focus:outline-none"
                      aria-label="Toggle site navigation"
                    >
                      {({ open }) =>
                        open ? (
                          <ChevronUpIcon className="h-8 w-8" />
                        ) : (
                          <MenuIcon className="h-8 w-8" />
                        )
                      }
                    </Popover.Button>
                    <div className="relative z-10 ml-3 inline-flex items-center">
                      <ClientOnly fallback={<SsrPlaceholder />}>
                        {() => <ThemeToggle />}
                      </ClientOnly>
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <>
                          <Popover.Overlay
                            static
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-0"
                          />
                          <Popover.Panel
                            static
                            as={motion.div}
                            initial={{ opacity: 0, y: -32 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              y: -32,
                              transition: { duration: 0.2 },
                            }}
                            className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20 dark:bg-slate-900"
                          >
                            <div className="space-y-4">
                              <MobileNavLink href="/">Inicio</MobileNavLink>
                              <MobileNavLink href="/posts">
                                Noticias
                              </MobileNavLink>
                              <MobileNavLink href="/noti-arbol">
                                Notiarbol
                              </MobileNavLink>
                              <MobileNavLink href="/nosotros">
                                {" "}
                                Nosotros
                              </MobileNavLink>
                              <MobileNavLink href="/books">
                                Biblioteca
                              </MobileNavLink>
                              <MobileNavLink href="/guide">
                                {" "}
                                Guia de especies
                              </MobileNavLink>
                            </div>
                            <div className="mt-8 flex flex-col gap-4">
                              {user && (
                                <Link
                                  to="/posts/admin"
                                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-green-600 to-green-600 bg-origin-border px-4 py-2 text-sm font-medium text-white shadow-sm"
                                >
                                  Ver notas de prensa {user.email}
                                </Link>
                              )}
                            </div>
                          </Popover.Panel>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </Popover>
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                {user && (
                  <Link
                    to="/posts/admin"
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-green-600 to-green-600 bg-origin-border px-4 py-2 text-sm font-medium text-white shadow-sm"
                  >
                    Ver notas de prensa {user.email}
                  </Link>
                )}
                <div className="px-4">
                  <ClientOnly fallback={<SsrPlaceholder />}>
                    {() => <ThemeToggle />}
                  </ClientOnly>
                </div>
              </div>
            </div>
          </Container>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
