import React, {useEffect, useState} from "react";
import {TablaActions} from "../Table";

const CatCarrera =({carrera,setCarrera,loading,setLoading})=>{

    const [columns, setColumns] = useState([
        { title: 'Nombre', field: 'descripcion', },
    ]);


    return(
        <TablaActions
            data={carrera}
            setData={setCarrera}
            load={loading}
            setLoad={setLoading}
            columns={columns}
            Title={'Catalogo Carrera'}
            tipocat={"catcarrera"}
        />
    )
}

export default CatCarrera;
