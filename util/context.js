import { createContext, useState } from "react";

export const Context = createContext({
    token: "",
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {},
});

function ContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token);
    }

    function logout() {
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ContextProvider;