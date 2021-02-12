import React, {useContext, useCallback, useEffect, useMemo, useState} from "react";
import {getUserID, getToken, isValid} from '../services/AuthServices';
import axios from "axios";
import {useHistory} from "react-router-dom";

const AuthContext = React.createContext({
    setUser: undefined,
    isLoggedIn: false,
    loading: false,
    logOut: () => {
    },
    checkAuth: () => {
    },});

 function ProviderAuth({children}) {
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(undefined)
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
        return user;
    }, [user])

    return (
        <AuthContext.Provider value={{
            loading: isLoading,
            isLoggedIn,
            userID: loggedUserID,
            checkAuth,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const authContext= useContext(AuthContext);
    return authContext;
}

export const protectedPage = (Component) => (props) => {
    let history = useHistory();
    let {loading: authLoading, checkAuth, isLoggedIn} = useAuth();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        checkAuth();

        if (!authLoading && !isLoggedIn) {
            console.log('authLoading',!authLoading)
            console.log('isLoggedIn',!isLoggedIn)

            history.replace('/login')

            setShouldRender(false);
        } else {
            console.log(isLoggedIn,'isLogge')
            isLoggedIn && setShouldRender(true)
        }
    }, [isLoggedIn, authLoading]);

    return ((!authLoading && shouldRender && <Component {...props} />) || null)
}

export default ProviderAuth;
