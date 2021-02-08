import React, {useEffect, useState} from "react";
import {Route, Redirect, useH, useHistory} from 'react-router-dom';
import {useAuth} from '../../Contex/authContext';

export function PrivateRouter({children, ...rest}) {
    let history = useHistory();

    const [shouldRender, setShouldRender] = useState(false);
    let {loading: authLoading, checkAuth, isLoggedIn} = useAuth();

    useEffect(() => {
        checkAuth();
        if (!authLoading && !isLoggedIn) {
            history.replace('/login')
            setShouldRender(false)
        } else {
            isLoggedIn && setShouldRender(true)
        }
    }, [isLoggedIn, authLoading])

    return ((!authLoading && shouldRender && <Route {...rest} render={() => (children)}></Route>) || null)
}

