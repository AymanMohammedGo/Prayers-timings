import { useEffect, useState } from "react";
import "./Numbers.css";
import image from "../images/anh-background-cong-nghe-xanh_035953035.jpg";
const Numbers = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  useEffect(() => {
    if (scrollPos > 700) {
      const timer1 = setInterval(() => {
        if (count1 < 589) {
          setCount1((count) => count + 1);
          setCount2((count2) => count2 + 1);
          setCount3((count3) => count3 + 1);
        } else if (count2 < 755) {
          setCount2((count2) => count2 + 1);
          setCount3((count3) => count3 + 1);
        } else if (count3 < 934) {
          setCount3((count3) => count3 + 1);
        }
      }, 3);
      return () => clearInterval(timer1);
    }
  }, [scrollPos, count1, count2, count3]);
  console.log(scrollPos);
  return (
    <div className="container">
      <div className="box">
        <i className="fas fa-user"></i>
        <h2>
          <span>+</span>
          {count1}
        </h2>
        <p>Users</p>
      </div>
      <div className="box">
        <i className="fas fa-star"></i>
        <h2>
          <span>+</span>
          {count2}
        </h2>
        <p>Reviews</p>
      </div>
      <div className="box">
        <i className="fas fa-heart"></i>
        <h2>
          <span>+</span>
          {count3}
        </h2>
        <p>Likes</p>
      </div>
      <img src={image} />
    </div>
  );
};

export default Numbers;
