import React, {useEffect, useState} from "react";
import {TablaActions} from "../Table";

const CatModalidad =({modalidad,setModalidad,loading,setLoading,setIsModalidad,isModalidad})=>{

    const [columns, setColumns] = useState([
        { title: 'Clave', field: 'id',editable: 'never' },
        { title: 'Nombre', field: 'nommodalidad' },
    ]);


    return(
        <TablaActions
            data={modalidad}
            setData={setModalidad}
            load={loading}
            setLoad={setLoading}
            columns={columns}
            Title={'Catalogo Modalidad'}
            tipocat={"catmodalidad"}
            setIsModalidad={setIsModalidad}
            isModalidad={isModalidad}
            />
    )
}

export default CatModalidad;
