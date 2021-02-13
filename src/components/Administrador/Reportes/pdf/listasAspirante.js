import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const columns = [
    { title: "Nombre",  dataKey: "nombreasp" },
    { title: "Apellido paterno", dataKey: "apepat" },
    { title: "Apellido materno", dataKey: "apemat" },
    { title: "Sexo", dataKey: "sexo" },
    { title: "Curp", dataKey: "curp" },
    { title: "Estado civil", dataKey: "escivil" },
    { title: "Telefono", dataKey: "telcelular" }]

export function pdfListaAspirantes(data) {
    let doc = new jsPDF('p', 'mm', 'letter')

    doc.setFontSize(14)
    doc.text(10, 10, 'Aspirantes')
    doc.autoTable(columns,data,
        {
            margin: { bottom: 50,top:35 },
            styles: { halign:'center',cellPadding: 0.5, fontSize: 7 },
            columnStyles: {
                0: { halign: 'left' },
                1: { halign: 'left',textTransform: 'upperCase' },
                2: { halign: 'left',textTransform: 'uppercase' }

            },
            headStyles:{
                fillColor:null ,
                textColor:'black',
                lineWidth: 0.1
            }

        }
    )
    doc.save('Lista Aspirantes')
}
