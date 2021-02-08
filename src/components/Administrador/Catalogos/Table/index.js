import React, {useState} from "react";
import MaterialTable from "material-table";
import {tableIcons} from '../../Reportes/IconosTable';
import axios from "axios";
import {ADMIN_ACTU_CAT_MODALIDAD, ADMIN_ELMIN_CAT_MODALIDAD, ADMIN_REGIS_CAT_MODALIDAD} from "../../../../constant";
import {useSnackbar} from 'notistack';


export function TablaActions({data, setData, load, setLoad, columns, Title, tipocat = ""}) {
    const {enqueueSnackbar} = useSnackbar();

    /*const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);*/
    const tipoCatModalidad = "catmodalidad";
    const tipoCiclo = "catciclo";
    const tipoCivil = "catcivil";


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
            }).finally(() => setLoad(false))
    }

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

    async function deleteCatModalidad(dataup) {
        if (dataup.nommodalidad) {
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
            }).finally(() => setLoad(false))
    }

    function opcionesAdd(tipo, datas) {
        switch (tipo) {
            case tipoCatModalidad:
                addCatModalidad(datas);
                break;
            case tipoCiclo:
                console.log("ciclo");
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
                console.log("ciclo");
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
                console.log("ciclo");
                break;
            default:
                console.log('Sin opciones')

        }
    }

    return (
        <MaterialTable
            icons={tableIcons}
            title={Title}
            columns={columns}
            data={data}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        async function adds() {
                            await setData([...data, newData]);
                            await opcionesAdd(tipocat, newData)
                        }

                        adds()
                            .then(() => resolve())

                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        async function updateData() {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);
                            await opcionesUpdate(tipocat, dataUpdate[index])
                        }

                        updateData().then(() => resolve())


                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        async function deleteDatas() {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            console.log('oldData', oldData)
                            await opcionesDelete(tipocat, oldData)
                            await dataDelete.splice(index, 1);
                            await setData([...dataDelete]);
                        }

                        deleteDatas().then(() => resolve())
                    }),
            }}

            isLoading={load}
        />
    )
}
