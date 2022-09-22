import React, { useState } from "react";
import arrowUp from "../assets/arrow_upward.svg";

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  if (!visible) return <></>;

  return (
    <button className="scrollButton" onClick={scrollToTop}>
      <img src={arrowUp} id="arrowUp" alt="up button" />
    </button>
  );
}

export default BackToTopButton;
