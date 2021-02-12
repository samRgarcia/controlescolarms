import React from "react";
import Dashboard from '../Dashboard/index';
import MenuCatalogos from "./MenuCatalogos";
import {protectedPage} from "../../../Contex/authContext";

const AdminCatalogos=()=>{
    return (
        <Dashboard>
            <MenuCatalogos></MenuCatalogos>
        </Dashboard>
    )
}

export default protectedPage(AdminCatalogos);
