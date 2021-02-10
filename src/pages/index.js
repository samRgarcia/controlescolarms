import React from "react";
import Inicio from "./Inicio";
import Aspirantes from '../components/Aspirante';
import Login from "../components/Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Administrador from "../components/Administrador";
import ReportesListas from "../components/Administrador/Reportes";
import {ProviderAuth} from '../Contex/authContext';
import {protectedPage} from '../childrens/auth';
import AdminCatalogos from "../components/Administrador/Catalogos";

const Rutas = () => {
    return (
        <ProviderAuth>
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
                    <Route path={'/reporte/listas'}>
                        <ReportesListas/>
                    </Route>
                    <Route path={'/catalogos'}>
                        <AdminCatalogos/>
                    </Route>
                </Switch>
            </Router>
        </ProviderAuth>
    )
}
export default Rutas;
