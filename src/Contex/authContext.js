import React, {useContext} from "react";
import {useProviderAuth} from '../hooks/useAuth'

const authContext = React.createContext();

export function ProviderAuth({children}) {
    const auth = useProviderAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
