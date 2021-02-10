import React, {useEffect, useState} from "react";
import {Route, Redirect, useHistory, useLocation} from 'react-router-dom';
import {useAuth} from '../../Contex/authContext';

export const protectedPage = (Component) => (props) => {
    let {loading: authLoading, checkAuth, isLoggedIn} = useAuth();
    let history = useHistory();
    const [shouldRender, setShouldRender] = useState(false);

    console.log('push')
    useEffect(() => {
        checkAuth();
        if (!authLoading && !isLoggedIn) {
                history.replace('/login')

            setShouldRender(false);
        } else {
            isLoggedIn && setShouldRender(true)
        }
    }, [isLoggedIn, authLoading,setShouldRender]);

    return ((!authLoading && shouldRender && <Component {...props} />) || null)
}

