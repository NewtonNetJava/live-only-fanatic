import {createContext, useState, useEffect} from "react";

const GlobalContext = createContext(undefined);

export const GlobalProvider = ({children}) => {
    // useState for all variables
    const [auth, setAuth] = useState({loggedIn: false});
    const [isLoading, setIsLoading] = useState(true);

    // useEffect to run methods upon load
    useEffect(() => {
        void checkAuth();
    }, []);

    // methods, could be for on load, or just called from elsewhere

    const checkAuth = async () => {
        setIsLoading(true);
        const response = await fetch("/data/login");
        const result = await response.json();
        setAuth(result);
        setIsLoading(false);
    };

    const submitLogin = async (email, password) => {
        setIsLoading(true);
        await fetch("/data/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });
        setIsLoading(false);
        void await checkAuth();
    };

    const logout = async () => {
        setIsLoading(true);
        await fetch("/data/login", {
            method: "delete",
        });
        setIsLoading(false);
        setAuth({loggedIn: false});
    };

    return (
        <GlobalContext.Provider
            value={{
                auth,
                isLoading,
                submitLogin,
                logout,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
