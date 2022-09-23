import {useState} from "react";
import Login from "../Login";
import DesktopNavigation from "./DesktopNavigation";
import useMediaQuery from "../../hooks/useMediaQuery";
import MobileNavigation from "./MobileNavigation";

export const LOGIN = "login";
export const SIGN_UP = "signup";

function Nav() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Method to toggle modal
    const [modalType, setModalType] = useState(LOGIN);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <>
            {isDesktop ? (
                <DesktopNavigation setIsModalOpen={setIsModalOpen}/>
            ) : (
                <MobileNavigation setIsModalOpen={setIsModalOpen}/>
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
