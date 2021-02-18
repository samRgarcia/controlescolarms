import React, {useEffect} from "react";
import MaterialTable from "material-table";
import {tableIcons} from "./IconosTable";
import axios from "axios";
import {ADMIN_DESCARGAR_CONSTANCIA, LISTA_ASPIRANTES} from "../../../constant";
import {pdfListaAspirantes} from './pdf/listasAspirante';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import FileSaver from 'file-saver';

export function ListTabla() {
    const [state, setState] = React.useState([])
    const [loader, setLoader] = React.useState(false);
    const [filePdf,setFilePdf]=React.useState(null);
    useEffect(() => {
        setLoader(true)
        axios.get(LISTA_ASPIRANTES)
            .then((res) => {
                setState(res.data)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoader(false))
    }, []);

    const descarcarConstancia=(folio)=>{
        //TODO:solicitar al backen con el folio
        axios.get(ADMIN_DESCARGAR_CONSTANCIA,{
            params: {
                folio:folio,
            }
        }).then((res)=>{
            console.log(res)
            setFilePdf(res.data)
            let blob = new Blob([res.data],{type:"application/pdf"})
            FileSaver.saveAs(blob,"prueba.pdf")
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
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
                }, {
                    title: 'Curp', field: 'curp', type: 'numeric',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "center"
                    }, headerStyle: {
                        textAlign: "center"
                    }
                },{
                    title: 'Sexo', field: 'sexo', type: 'numeric',
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
                    },
                },
                {
                    title: 'Constancia', field: 'constanciaes', type: 'numeric',
                    cellStyle: {
                        color: '#5b5757',
                        textAlign: "center"
                    }, headerStyle: {
                        textAlign: "center"
                    },
                },
            ]}
            data={state}
            options={{
                exportButton: false,
                actionsColumnIndex: -1
            }}
            localization={
                {
                    toolbar: {searchPlaceholder: 'Buscar..'},
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'Filas'
                    },
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
                },
                {
                    icon: () => <VerticalAlignBottomIcon/>,
                    tooltip: 'Constancia',
                    onClick: (event, rowData) => {
                        if(rowData.constanciaes==='NO'){
                            alert(`El aspirante: ${rowData.nombreasp} no cuenta con constancia de estudio.`)
                        }else{
                            console.log(rowData)
                            descarcarConstancia(rowData.folio)
                        }
                    }
                },
            ]}
        />

        </>
    )
}
