import React from "react";

const HeaderLayout = ({ heading, image }) => (
  <div className="flex h-screen flex-col	">
    <div
      className="
            relative flex h-full items-center justify-center
            bg-cover bg-fixed bg-center bg-no-repeat
          "
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {heading && (
        <h1
          className="
            relative z-10 px-2.5 text-center text-5xl uppercase text-white md:text-7xl
          "
        >
          {heading}
        </h1>
      )}
      <div
        className="
              absolute -top-0 -left-0 z-0 h-full w-full bg-black opacity-50
            "
      />
    </div>
  </div>
);

export default HeaderLayout;
