import React from "react";
import axios from "axios";
import {
    ADMIN_ACTU_CAT_CARRERA,
    ADMIN_ACTU_CAT_CICLO,
    ADMIN_ACTU_CAT_MODALIDAD, ADMIN_ELMIN_CAT_CARRERA, ADMIN_ELMIN_CAT_CICLO,
    ADMIN_ELMIN_CAT_MODALIDAD, ADMIN_REGIS_CAT_CARRERA,
    ADMIN_REGIS_CAT_CICLO,
    ADMIN_REGIS_CAT_MODALIDAD
} from "../../../../constant";
import {useSnackbar} from 'notistack';
import DataTable from "./dataTable";


export function TablaActions({data, setData, load, setLoad, columns, Title, tipocat = "",setIsModalidad,isModalidad}) {
    const {enqueueSnackbar} = useSnackbar();

    /*const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);*/
    const tipoCatModalidad = "catmodalidad";
    const tipoCiclo = "catciclo";
    const tipoCivil = "catcivil";
    const tipoCarre = "catcarrera";

//TODO:Guardar data
    async function addCatModalidad(upname) {
        if (upname.nommodalidad) {
            setLoad(true)
        }
        upname.nommodalidad && await axios.post(ADMIN_REGIS_CAT_MODALIDAD, {
            nommodalidad: upname.nommodalidad
        })
            .then(() => {
                enqueueSnackbar("Datos registrados correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al guardar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => {
                setLoad(false)
                setIsModalidad(!isModalidad)
            })
    }

//nomciclo: "esto", catmodalidad_id: "9"
    async function addCatCiclo(upnameci) {
        if (upnameci.catmodalidad_id) {
            setLoad(true)
        }
        upnameci.catmodalidad_id && await axios.post(ADMIN_REGIS_CAT_CICLO, {
            nomciclo: upnameci.nomciclo,
            catmodalidad_id: upnameci.catmodalidad_id,
            cbtas_idcbtas: 1,
        })
            .then(() => {
                enqueueSnackbar("Datos registrados correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al guardar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }

    //idcarreras, descripcion, cbtas_idcbtas
    async function addCatCarrera(upnameca) {
        if (upnameca.descripcion) {
            setLoad(true)
        }
        upnameca.descripcion && await axios.post(ADMIN_REGIS_CAT_CARRERA, {
            descripcion: upnameca.descripcion,
            cbtas_idcbtas: 1,
        })
            .then(() => {
                enqueueSnackbar("Datos registrados correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al guardar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }

//TODO:Updata

    async function updateCatModalidad(dataup) {
        if (dataup.nommodalidad) {
            setLoad(true)
        }
        dataup.nommodalidad && await axios.put(ADMIN_ACTU_CAT_MODALIDAD, {
            nommodalidad: dataup.nommodalidad,
            id: dataup.id
        })
            .then(() => {
                enqueueSnackbar("Datos actualizados correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al actualizar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }

    async function updateCatCiclo(dataupc) {
        if (dataupc.catmodalidad_id) {
            setLoad(true)
        }
        dataupc.catmodalidad_id && await axios.put(ADMIN_ACTU_CAT_CICLO, {
            nomciclo: dataupc.nomciclo,
            catmodalidad_id: dataupc.catmodalidad_id,
            id: dataupc.id
        })
            .then(() => {
                enqueueSnackbar("Datos actualizados correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al actualizar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }
    //idcarreras, descripcion, cbtas_idcbtas

    async function updateCatCarrera(dataupca) {
        if (dataupca.descripcion) {
            setLoad(true)
        }
        dataupca.descripcion && await axios.put(ADMIN_ACTU_CAT_CARRERA, {
            descripcion: dataupca.descripcion,
            idcarreras:dataupca.idcarreras
        })
            .then(() => {
                enqueueSnackbar("Datos actualizados correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al actualizar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }

//TODO:Delete data

    async function deleteCatModalidad(dataup) {
        if (dataup.id) {
            setLoad(true)
        }
        dataup.id && await axios.delete(ADMIN_ELMIN_CAT_MODALIDAD, {
            params: {id: dataup.id}
        })
            .then(() => {
                enqueueSnackbar("Dato eliminar correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al eliminar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => {
                setLoad(false)
                setIsModalidad(!isModalidad)
            })
    }

    async function deleteCatCiclos(dataupc) {
        if (dataupc.id) {
            setLoad(true)
        }
        dataupc.id && await axios.delete(ADMIN_ELMIN_CAT_CICLO, {
            params: {id: dataupc.id}
        })
            .then(() => {
                enqueueSnackbar("Dato eliminar correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al eliminar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }

    async function deleteCatCarrera(dataupca) {
        if (dataupca.idcarreras) {
            setLoad(true)
        }
        dataupca.idcarreras && await axios.delete(ADMIN_ELMIN_CAT_CARRERA, {
            params: {idcarreras: dataupca.idcarreras}
        })
            .then(() => {
                enqueueSnackbar("Dato eliminado correctamente",
                    {
                        variant: 'success',
                        preventDuplicate: true,
                    })
            })
            .catch(() => {
                enqueueSnackbar("Error al eliminar",
                    {
                        variant: 'error',
                        preventDuplicate: true,
                    })
            }).finally(() => setLoad(false))
    }


//TODO:Todas las opciones add
    async function opcionesAdd(tipo, datas) {
        switch (tipo) {
            case tipoCatModalidad:
                await addCatModalidad(datas);
                break;
            case tipoCiclo:
                await addCatCiclo(datas);
                break;
            case tipoCarre:
                addCatCarrera(datas)
                break;
            default:
                console.log('Sin opciones')
        }
    }

    function opcionesUpdate(tipo, datas) {
        switch (tipo) {
            case tipoCatModalidad:
                updateCatModalidad(datas);
                break;
            case tipoCiclo:
                updateCatCiclo(datas);
                break;
            case tipoCarre:
                updateCatCarrera(datas);
                break;
            default:
                console.log('Sin opciones')

        }
    }


    function opcionesDelete(tipo, datas) {
        switch (tipo) {
            case tipoCatModalidad:
                deleteCatModalidad(datas);
                break;
            case tipoCiclo:
                deleteCatCiclos(datas);
                break;
            case tipoCarre:
                deleteCatCarrera(datas);
                break;
            default:
                console.log('Sin opciones')

        }
    }

    return (
        <DataTable
            Title={Title}
            columns={columns}
            data={data}
            tipocat={tipocat}
            setLoad={setLoad}
            load={load}
            setData={setData}
            opcionesDelete={opcionesDelete}
            opcionesUpdate={opcionesUpdate}
            opcionesAdd={opcionesAdd}
        />
    )
}
