import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import Logout from "../Logout";
import SearchBar from "../SearchBar";
import GlobalContext from "../../context/GlobalContext";

export const links = [
  { href: "/events", name: "Events" },
  { href: "/venues", name: "Venues" },
];

export const profileSubLinks = [
  { href: "/my-tickets", name: "My tickets" },
  { href: "/profile", name: "My Profile" },
];

export default function ({ setIsModalOpen }) {
  const [showSubLinks, setShowSubLinks] = useState(false);
  const profileRef = useRef(null);
  const { auth } = useContext(GlobalContext);

  useClickOutside(profileRef, () => setShowSubLinks(false));

  return (
    <div className="site-navigation">
      <div>LOGO</div>
      <SearchBar placeholder={"Search"} />
      <div className="navigation-links">
        {links.map((link, index) => {
          return (
            <Link className="navigation-links__link" to={link.href} key={index}>
              {link.name}
            </Link>
          );
        })}

        {auth.loggedIn && (
          <div
            ref={profileRef}
            className="navigation-links__link"
            onMouseEnter={() => setShowSubLinks(true)}
            onMouseLeave={() => setShowSubLinks(false)}
          >
            My Profile
            {showSubLinks && (
              <div className="sub-navigation">
                {profileSubLinks.map((subLink, index) => {
                  return (
                    <Link
                      className="sub-navigation__link"
                      to={subLink.href}
                      key={index}
                    >
                      {subLink.name}
                    </Link>
                  );
                })}
                <Logout />
              </div>
            )}
          </div>
        )}
        {!auth.loggedIn && (
          <button
            className="custom-button"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
