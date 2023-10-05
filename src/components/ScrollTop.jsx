import arrow from "../images/arrow-up-circle-fill.svg";
const ScrollTop = () => {
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div style={{ position: "relative" }} className="scrollUp">
      <img
        style={{
          border: "4px solid white",
          borderRadius: "88px",
          width: "60px",
          position: "fixed",
          left: "50px",
          bottom: "20px",
        }}
        src={arrow}
        alt=""
        onClick={scroll}
      />
    </div>
  );
};

export default ScrollTop;
