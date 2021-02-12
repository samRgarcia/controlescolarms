import React from "react";
import LoyautDaschboard from "./Dashboard";
import {protectedPage} from "../../Contex/authContext";

const Admin =()=>{
    return(<LoyautDaschboard/>)
}

export default protectedPage(Admin);
