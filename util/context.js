import { createContext, useEffect, useState } from "react";
import async_storage from "./async_storage";
import auth from "./auth";

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
        async_storage.getObjectData("authInfo").then((value) => {
            if(value) {
                auth.login(value.email, value.password).then((value) => setAuthToken(value.data.idToken));
            }
        });
    }, []);

    function setUserCrediantials(data) {
        setUserData(data);
    }

    function authenticate(token) {
        setAuthToken(token);
    }

    function logout() {
        setAuthToken(null);
        async_storage.removeItem("authInfo");
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