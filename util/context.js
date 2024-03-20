import { createContext, useEffect, useState } from "react";
import async_storage from "./async_storage";

export const Context = createContext({
    token: "",
    isAuthenticated: false,
    userData: {},
    setUserCrediantials: (data) => {},
    authenticate: (token) => {},
    logout: () => {},
});

function ContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [userData, setUserData] = useState();

    useEffect(() => {
        async_storage.getStringData("token").then((value) => {
            if(value) {
                setAuthToken(value);
            }
        });
    }, []);

    function setUserCrediantials(data) {
        setUserData(data);
    }

    function authenticate(token) {
        setAuthToken(token);
        async_storage.storeStringData("token", token);
    }

    function logout() {
        setAuthToken(null);
        async_storage.removeItem("token");
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        userData: userData,
        setUserCrediantials: setUserCrediantials,
        authenticate: authenticate,
        logout: logout,
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ContextProvider;