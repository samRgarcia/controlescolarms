import React, {useEffect} from "react";
import MaterialTable from "material-table";
import {tableIcons} from "./IconosTable";
import axios from "axios";
import {LISTA_ASPIRANTES} from "../../../constant";
import {pdfListaAspirantes} from './pdf/listasAspirante';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';


export function ListTabla() {
    const [state, setState] = React.useState([])
    const [loader, setLoader] = React.useState(false);
    useEffect(() => {
        setLoader(true)
        axios.get(LISTA_ASPIRANTES)
            .then((res) => {
                setState(res.data)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoader(false))
    }, [])

    return (
        <MaterialTable
            icons={tableIcons}
            title="Lista por ciclo"
            columns={[
                {
                    title: 'Nombre', field: 'nombreasp',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "left"
                    }, headerStyle: {
                        textAlign: "left"
                    }
                },
                {
                    title: 'Apellido paterno', field: 'apepat',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "center"
                    }, headerStyle: {
                        textAlign: "center"
                    }
                },
                {
                    title: 'Apellido materno', field: 'apemat', type: 'numeric',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "center"
                    }, headerStyle: {
                        textAlign: "center"
                    }
                },
                {
                    title: 'Telefono', field: 'telcelular', type: 'numeric',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "center"
                    }, headerStyle: {
                        textAlign: "center"
                    }
                }, {
                    title: 'Email', field: 'email', type: 'numeric',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "center"
                    }, headerStyle: {
                        textAlign: "center"
                    }
                },

            ]}
            data={state}
            options={{
                exportButton: false
            }}
            localization={
                {
                    toolbar: {searchPlaceholder: 'Buscar..'},
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'Filas'
                    }
                }
            }
            isLoading={loader}
            actions={[
                {
                    icon: () => <PictureAsPdfIcon/>,
                    tooltip: 'PDF',
                    isFreeAction: true,
                    onClick: (() => {
                        pdfListaAspirantes(state)
                    })
                }
            ]}
        />
    )
}
