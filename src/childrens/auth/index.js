import {Route,Redirect} from 'react-router-dom';
import {useAuth} from '../../Contex/authContext';

export function PrivateRouter({children,...rest}) {
    let auth = useAuth();
    console.log('auth',auth)
    return(
        <Route
            {...rest}
            render={({location})=>
            auth.user ? (children):(
                <Redirect
                to={{
                    pathname:"/login",
                    state:{from:location}
                }}
                />
            )
            }
        >

        </Route>
    )
}
