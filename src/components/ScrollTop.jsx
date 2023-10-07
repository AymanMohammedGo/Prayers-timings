import { useEffect, useState } from "react";
import arrow from "../images/arrow-up-circle-fill.svg";
import { motion } from "framer-motion";
const ScrollTop = () => {
  const [sc, setSc] = useState(false);
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (window.scrollY > 0) {
      setSc(true);
    }
  }, [window.scrollY]);

  return (
    sc && (
      <div style={{ position: "relative" }} className="scrollUp">
        <motion.img
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
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
    )
  );
};

export default ScrollTop;
