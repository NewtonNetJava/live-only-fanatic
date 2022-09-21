import hamburgerSvg from "../assets/hamburger.svg";
import closeSvg from "../assets/close.svg";

function Hamburger({ isOpen }) {
  return (
    <>
      <div className="hamburger">
        <img src={hamburgerSvg} id="burger" alt="home button" />
        <img src={closeSvg} id="cross" alt="close button" />
      </div>

      <style jsx="true">{`
        #burger {
          display: ${isOpen ? "none" : "grid"};
        }
        #cross {
          display: ${isOpen ? "grid" : "none"};
        }

        .hamburger img {
          width: 32px;
          height: 32px;
        }
        @media (min-width: 767px) {
          .hamburger {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Hamburger;
