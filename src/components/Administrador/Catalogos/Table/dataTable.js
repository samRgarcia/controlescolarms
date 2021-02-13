import React from "react";
import MaterialTable from "material-table";
import {tableIcons} from "../../Reportes/IconosTable";


export default function DataTable({data, setData, load, columns, Title, tipocat = "", opcionesDelete, opcionesUpdate, opcionesAdd}) {
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
                            await opcionesDelete(tipocat, oldData)
                            await dataDelete.splice(index, 1);
                            await setData([...dataDelete]);
                        }

                        deleteDatas().then(() => resolve())
                    }),
            }}

            isLoading={load}
            localization={
                {
                    toolbar: {
                        searchPlaceholder: 'Buscar..',
                    },
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'Filas'
                    },
                    body: {editRow: {
                        deleteText: 'Eliminar registro ?',
                        saveTooltip:'Guardar'
                        },
                        addTooltip:'Nuevo',
                        editTooltip:'Modificar',
                        deleteTooltip:'Eliminar'
                        },

                }
            }



        />)
}
