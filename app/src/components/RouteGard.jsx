import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const RouteGuard = ({ children }) => {
  const { auth } = useContext(GlobalContext);

  // render your error message here
  if (!auth.isLoggedIn) return <>Access denied</>;

  return children;
};

export default RouteGuard;
