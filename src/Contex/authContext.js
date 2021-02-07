import React, {useContext, useCallback, useEffect, useMemo} from "react";
import {getUserID, getToken, isValid} from '../services/AuthServices';
import axios from "axios";

const authContext = React.createContext();

export function ProviderAuth({children}) {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(false)
    const [logged, setLogged] = React.useState(false);
    //const auth = useProviderAuth();
    const checkAuth = useCallback(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
        setLoading(true)
        setUser(getUserID());
        setLogged(isValid());
        setLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    const logOut = useCallback(() => {
        setLoading(false)
        setLogged(false);
        setUser(undefined);
    }, [setLoading, setLogged, setUser]);


    const isLoggedIn = useMemo(() => {
        return logged;
    }, [logged]);

    const isLoading = useMemo(() => {
        return loading;
    }, [loading]);

    const loggedUserID = useMemo(() => {
        console.log(user)
        return user;
    }, [user])

    return (
        <authContext.Provider value={{
            loading: isLoading,
            isLoggedIn,
            userID: loggedUserID,
            checkAuth,
            logOut
        }}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}
