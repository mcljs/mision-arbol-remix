import React from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  AnnotationIcon,
  ChatAlt2Icon,
  ChatAltIcon,
  DocumentReportIcon,
  HeartIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
  ReplyIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "../Link";
import { useOptionalUser } from "~/utils";
import clsx from "clsx";
import { ClientOnly } from "../client-only";
import ThemeToggle, { SsrPlaceholder } from "../theme-toggle";

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
    <Popover
      as="div"
      className={clsx(
        "sticky top-0 z-40 w-full flex-none py-4 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] lg:z-50 lg:border-b lg:border-slate-900/10",
        isOpaque
          ? "bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
          : "bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
      )}
    >
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <span className="sr-only">Workflow</span>
            <img className="h-10 w-auto sm:h-12" src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="-my-2 -mr-2 flex md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200">
            <span className="sr-only">Open menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
          <div className="ml-4 mt-1">
            <ClientOnly fallback={<SsrPlaceholder />}>
              {() => <ThemeToggle />}
            </ClientOnly>
          </div>
        </div>
        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
          <Link
            to="/"
            className="text-base font-medium text-slate-900 dark:text-gray-50"
          >
            Inicio
          </Link>
          <Link
            to="/posts"
            className="text-base font-medium text-slate-900 hover:text-slate-800 dark:text-gray-50"
          >
            Noticias
          </Link>
          <Link
            to="/noti-arbol"
            className="text-base font-medium text-slate-900 hover:text-slate-800 dark:text-gray-50"
          >
            Notiarbol
          </Link>
          <Link
            to="/nosotros"
            className="text-base font-medium text-slate-900 hover:text-slate-800 dark:text-gray-50"
          >
            Nosotros
          </Link>
          <Link
            to="/books"
            className="text-base font-medium text-slate-900 hover:text-slate-800 dark:text-gray-50"
          >
            Biblioteca
          </Link>
          <Link
            to="/guide"
            className="text-base font-medium text-slate-900 hover:text-slate-800 dark:text-gray-50"
          >
            Guia de especies
          </Link>
        </Popover.Group>

        {/*
        {!loggedIn ? (
     null
        ) : (
          <Form method="post">
            <button type="submit" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700">
              Logout
            </button>
          </Form>
        )}
         */}
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          {user && (
            <Link
              to="/posts/admin"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-green-600 to-green-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm"
            >
              View Post for {user.email}
            </Link>
          )}
          <div className="px-4">
            <ClientOnly fallback={<SsrPlaceholder />}>
              {() => <ThemeToggle />}
            </ClientOnly>
          </div>
        </div>
      </div>

      <Transition
        as={React.Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-[999999] origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src="/logo.png" alt="Workflow" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="ocus:outline-none inline-flex items-center justify-center rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-gray-900 dark:text-slate-100">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid grid-cols-1 gap-7">
                  {navItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="block w-full p-2 dark:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Navbar;
