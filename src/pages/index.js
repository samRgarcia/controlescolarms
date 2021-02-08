import React from "react";
import Inicio from "./Inicio";
import Aspirantes from '../components/Aspirante';
import Login from "../components/Login";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Administrador from "../components/Administrador";
import ReportesListas from "../components/Administrador/Reportes";
import {ProviderAuth} from '../Contex/authContext';
import {PrivateRouter} from '../childrens/auth';
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
                    <PrivateRouter path={'/dashboard'}>
                        <Administrador/>
                    </PrivateRouter>
                    <PrivateRouter path={'/reporte/listas'}>
                        <ReportesListas/>
                    </PrivateRouter>
                    <PrivateRouter path={'/catalogos'}>
                        <AdminCatalogos/>
                    </PrivateRouter>
                </Switch>
            </Router>
        </ProviderAuth>
    )
}
export default Rutas;
