import React, {useEffect, useMemo, useState} from "react";
import {TablaActions} from '../Table';
import axios from "axios";
import {ADMIN_LISTA_CAT_CICLO} from "../../../../constant";

const CatCiclo = ({modalidad}) => {
    const [ciclos, setCiclos] = React.useState([]);
    const [itemLookup, setItemLookup] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [columns, setColumns] = useState([
        {title: 'Ciclo', field: 'nomciclo'},
        {title: 'Modalidad', field: 'catmodalidad_id', lookup: {}},
    ]);

    useMemo(() => {
        try {
            async function updateLup() {
                let clientOptions = {};
                await modalidad.map(item => {
                    let {id, nommodalidad} = item;
                    clientOptions[id] = nommodalidad
                })
                return clientOptions;
            }
            updateLup().then((res) => setItemLookup(res));
        } catch (e) {
            console.log(e)
        }

    }, [modalidad])

    useMemo(()=>{
        setColumns([
            {title: 'Ciclo', field: 'nomciclo'},
            {title: 'Modalidad', field: 'catmodalidad_id', lookup: itemLookup},
        ])
    },[itemLookup])

    useEffect(() => {
        setLoading(true)
        axios.get(ADMIN_LISTA_CAT_CICLO, {
            params: {
                idCbtas: 1
            }
        })
            .then(res => {
                setCiclos(res.data)
                const lups = res.data
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    return (<TablaActions data={ciclos} setData={setCiclos} columns={columns} load={loading} setLoad={setLoading}
                          Title={'Cat ciclos'} tipocat={"catciclo"}/>)

}

export default CatCiclo;
