import React from "react";
import {Button} from "@material-ui/core";

export function Informacion(){
    return <h5 style={{textAlign:'center'}}>Los campos marcados con * son requeridos.</h5>
}
export function ButtonFormulario() {
    return <Button style={{marginLeft:'80px'}} variant="contained" color="primary" type={"submit"}>Siguiente</Button>
}
