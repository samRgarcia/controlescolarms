import jsPDF from "jspdf";
import {format} from 'date-fns';
import {logoSep} from './img';
import axios from "axios";
import {DOCUMENTO_COMPROBATE} from "../../../constant";

export async function dataComprobante(folio=42) {
    await axios.get(DOCUMENTO_COMPROBATE,{
        params:{
            folio:folio
        }
    })
        .then(res=>{
            console.log(res.data)
            pdfComprobanteAspirantes(res.data)
        })
        .catch(error=>console.log(error))
}

export function pdfComprobanteAspirantes(data) {
const [dataAspirante]=data;
    let doc = new jsPDF('p', 'mm', 'letter')
    doc.addImage(logoSep, 'JPEG', 5, 5, 70,20)
    doc.setFontSize(14)
    doc.setFont('helvetica')
    doc.setFont("bold")
    doc.text(109, 10, 'Subsecretaría de Educación Media Superior')
    doc.text(109, 15, 'Dirección General de Educación Tecnológica')
    doc.text(109, 20, 'Agropecuaria y Ciencias del Mar')

    doc.setFont("normal")
    doc.text(81, 35, 'Centro de Bachillerato Tecnológico Agropecuario No. 265')

    doc.text(30, 50, 'COMPROBANTE DE REGISTRO DE PREINSCRIPCION EN LINEA')
    doc.text(85, 55, 'CICLO 2021-2022')
    doc.text(105, 65, `FECHA DE REGISTRO: ${format(new Date(), 'dd/MM/yyyy')}`)
    doc.text(12, 100,  `CURP: ${dataAspirante.curp.toUpperCase()}`)
    doc.text(12, 110, `NOMBRE DEL ASPIRANTE: ${dataAspirante.aspirante.toUpperCase()}`)
    doc.text(12, 120, `NOMBRE DEL TUTOR: ${dataAspirante.tutornombre.toUpperCase()}`)
    doc.text(12, 130, `DIRECCION: ${dataAspirante.direccion.toUpperCase()}`)
    doc.text(12, 140, `CARRERA SELECCIONADA: ${dataAspirante.carrera.toUpperCase()}`)

    doc.setFontSize(10)
    doc.text(35, 275, 'Km. 1.5 carretera Villa Quetzalcóatl–Arroyo el Triunfo primera sección, Balancán, Tabasco.')


    doc.save('Comprobante')
}

