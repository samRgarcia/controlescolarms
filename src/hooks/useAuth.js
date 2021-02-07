import React, {useCallback, useEffect} from "react";
//import {getUserID, getToken, isValid} from '../services/AuthServices';
import axios from "axios";

const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
        fakeAuth.isAuthenticated = true;
        cb();
        //TODO:code
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        //TODO: code
        cb()
    }
};

export function useProviderAuth() {
    const [user, setUser] = React.useState(null)
    const [logged, setLogged] =React.useState(false);


    /*useEffect(()=>{
        axios.defaults.headers.common['Authorization']=`Bearer ${getToken()}`;
        setUser(getUserID());
        setLogged(isValid());

    },[])*/

    /*const logOut = useCallback(()=>{
        setLogged(false);
        setUser(undefined);
    },[setUser,setLogged])*/

    /*const signin = cb => {
        return fakeAuth.signin(() => {
            setUser("user")
            cb();
        })
    };*/

    /*const signout = cb => {
        return fakeAuth.signout(() => {
            setUser(null);
            cb();
        })
    };*/
    return {
    };
}
