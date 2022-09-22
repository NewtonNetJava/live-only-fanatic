import { React, useContext, useState } from "react";
import Hamburger from "../Hamburger";
import { links, profileSubLinks } from "./DesktopNavigation";
import searchSvg from "../../assets/search.svg";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import SignUp from "../SignUp";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import GlobalContext from "../../context/GlobalContext";

export const LOGIN = "login";
export const SIGN_UP = "signup";

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      fill="#ffffff"
    >
      <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" />
    </svg>
  );
}

function MobileNavigation({ setIsModalOpen }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { auth } = useContext(GlobalContext);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);

    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((open) => {
      return !open;
    });

    setHamburgerOpen(false);
  };

  useLockBodyScroll(hamburgerOpen);

  return (
    <>
      <div className="mobile-navigation-header">
        <div className="hamburger" onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen} />
        </div>
        <Link to="/" id="home-button">
          <div>Logo</div>
        </Link>
        <button
          className="mobile-navigation-header__search-button"
          onClick={toggleSearch}
        >
          <SearchIcon />
        </button>
      </div>
      <div
        className={`hamburger-menu ${hamburgerOpen && "hamburger-menu--open"}`}
      >
        <div className="mobile-navigation-links">
          <div>
            {[...links, ...profileSubLinks].map((link) => {
              return (
                <Link
                  key={link.href + link.name}
                  className="mobile-navigation-links__link"
                  to={link.href}
                  onClick={toggleHamburger}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          {!auth.loggedIn && (
            <button
              className="custom-button hamburger-sign-up-button"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className={`search-menu ${isSearchOpen && "search-menu--open"}`}>
        <SearchBar onSearchClick={() => setIsSearchOpen(false)} />
      </div>
    </>
  );
}

export default MobileNavigation;
