import React from "react";
import {ListTabla} from './TableLista';
import Dashboard from "../Dashboard/index";
import {protectedPage} from '../../../Contex/authContext';

 function ReportesListas() {
    return <Dashboard>
        <ListTabla/>
    </Dashboard>
}
export default protectedPage(ReportesListas);
