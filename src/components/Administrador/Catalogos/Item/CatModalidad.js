import React, {useEffect, useState} from "react";
import {TablaActions} from "../Table";
import axios from "axios";
import {ADMIN_LISTA_CAT_MODALIDAD} from "../../../../constant";


const CatModalidad =()=>{
    const[modalidad,setModalidad]=React.useState([]);
    const [loading,setLoading]=React.useState(false);
    const [columns, setColumns] = useState([
        { title: 'Clave', field: 'id',editable: 'never' },
        { title: 'Nombre', field: 'nommodalidad' },
    ]);
    useEffect(()=>{
        setLoading(true)
        axios.get(ADMIN_LISTA_CAT_MODALIDAD)
            .then(res=> {
                console.log(res.data)
                setModalidad(res.data)
            })
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    },[])

    return(
        <TablaActions
            data={modalidad}
            setData={setModalidad}
            load={loading}
            setLoad={setLoading}
            columns={columns}
            Title={'Catalogo Modalidad'}
            tipocat={"catmodalidad"}
            />
    )
}

export default CatModalidad;
