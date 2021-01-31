import React from "react";
import Inicio from "./Inicio";
import Aspirantes from '../components/Aspirante';
import Login from "../components/Login";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Administrador from "../components/Administrador";

const Rutas = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                        <Inicio/>
                    </Route>
                    <Route path={'/registro'}>
                        <Aspirantes/>
                    </Route>
                    <Route path={'/login'}>
                        <Login/>
                    </Route>
                    <Route path={'/dashboard'}>
                        <Administrador/>
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
    )
}
export default Rutas;