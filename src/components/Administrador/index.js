import React from "react";
import LoyautDaschboard from "./Dashboard";
import {protectedPage} from "../../childrens/auth";

const Admin =()=>{
    return(<LoyautDaschboard/>)
}

export default protectedPage(Admin);
