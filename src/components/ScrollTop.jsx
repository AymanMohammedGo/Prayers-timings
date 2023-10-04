import React from "react";
import arrow from "../images/arrow-up-circle-fill.svg";
const ScrollTop = () => {
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="scrollUp">
      <img
        style={{
          border: "4px solid white",
          borderRadius: "88px",
          width: "80px",
          position: "absolute",
          left: "50px",
        }}
        src={arrow}
        alt=""
        onClick={scroll}
      />
    </div>
  );
};

export default ScrollTop;
