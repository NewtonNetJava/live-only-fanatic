import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";

import Hamburger from "../Hamburger";
import homeSvg from "../../assets/home.svg";
import eventSvg from "../../assets/events.svg";
import ticketSvg from "../../assets/ticket.svg";
import profileSvg from "../../assets/profile.svg";
import Login from "../Login";
import DesktopNavigation from "./DesktopNavigation";
import useMediaQuery from "../../hooks/useMediaQuery";
import GlobalContext from "../../context/GlobalContext";
import MobileNavigation from "./MobileNavigation";

export const LOGIN = "login";
export const SIGN_UP = "signup";

function Nav() {
  const { auth } = useContext(GlobalContext);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // Method to toggle modal
  const [modalType, setModalType] = useState(LOGIN);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <DesktopNavigation setIsModalOpen={setIsModalOpen} />
      ) : (
        <MobileNavigation setIsModalOpen={setIsModalOpen} />
      )}
      <div>
        {isModalOpen && (
          <Login
            setIsModalOpen={setIsModalOpen}
            setModalType={setModalType}
            modalType={modalType}
          />
        )}
      </div>
    </>
  );
}

export default Nav;
