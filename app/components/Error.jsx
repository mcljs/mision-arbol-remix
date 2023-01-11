import { useMatches } from "@remix-run/react";
import * as React from "react";
import errorStack from "error-stack-parser";
import clsx from "clsx";

function RedBox({ error }) {
  const [isVisible, setIsVisible] = React.useState(true);
  const frames = errorStack.parse(error);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-10 flex items-center justify-center transition",
        {
          "pointer-events-none opacity-0": !isVisible,
        }
      )}
    >
      <button
        className="absolute inset-0 block h-full w-full bg-black opacity-75"
        onClick={() => setIsVisible(false)}
      />
      <div className="border-lg text-primary relative mx-5vw my-16 max-h-75vh overflow-y-auto rounded-lg bg-red-500 p-12">
        <h2>{error.message}</h2>
        <div>
          {frames.map((frame) => (
            <div
              key={[frame.fileName, frame.lineNumber, frame.columnNumber].join(
                "-"
              )}
              className="pt-4"
            >
              <h6 as="div" className="pt-2">
                {frame.functionName}
              </h6>
              <div className="font-mono opacity-75">
                {frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorPage({ error, articles, heroProps }) {
  return (
    <>
      <noscript>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            padding: 30,
          }}
        >
          <h1 className="text-white" style={{ fontSize: "2em" }}>{heroProps.title}</h1>
          <p className="text-white"  style={{ fontSize: "1.5em" }}>{heroProps.subtitle}</p>
          <small>
            Also, this site works much better with JavaScript enabled...
          </small>
        </div>
      </noscript>
      <main className="relative">
        {error && process.env.NODE_ENV === "development" ? (
          <RedBox error={error} />
        ) : null}
      </main>
    </>
  );
}

export { ErrorPage };
