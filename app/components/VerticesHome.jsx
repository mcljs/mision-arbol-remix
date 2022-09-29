import Link from "./Link";

const people = [
  {
    name: "Territorialización de la preservación a través del poder popular ",
    imageUrl: "/vertices/vertice1.png",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Preservación y conservación de la vida y el futuro.",
    role: "Senior Designer",
    imageUrl: "/vertices/vertice2.png",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Desarrollo sustentable y hábitat sostenible. ",
    imageUrl: "/vertices/vertice3.png",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

export default function VerticesHome() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight text-black dark:text-slate-100 sm:text-4xl">
              Vertices
            </h2>
          </div>
          <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
            {people.map((person) => (
              <Link key={person.name}>
                <li className="focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary-500 duration-300 disabled:opacity-50 disabled:ring-primary-500 rounded-lg lg:mt-0 bg-primary-900 py-10 px-6 text-center transition xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
                      src={person.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-center">
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3 className="text-center text-slate-50">
                          {person.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
