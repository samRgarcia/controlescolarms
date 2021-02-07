import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import TextFields from "../../TexFields";
import './css/datosPersonales.css'
import SelecSexo from "../../Selects/SelectSexo";
import SelecEstados from "../../Selects/SelectEstado";
import SelecMunicipio from "../../Selects/SelectMunicipio";
import SelecEstadoCivil from "../../Selects/SelectEstadoCivil";
import LayoutForm from "../../../childrens/LayoutForm";
import {ButtonFormulario, Informacion} from "./Informacion";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {Button} from "@material-ui/core";

const Formularios = ({handleNext, setDataState, dataState,setFilePdf,filePdf}) => {
    const [idEstados, setIdEstados] = React.useState(null);
    const handlChange = (values) => {
        setDataState({...dataState, infoPersonal: values})
        handleNext()
    }
    const openWindowsBrouser = () => {
        window.open("https://www.gob.mx/curp/")
    }

    return (
        <Formik
            initialValues={{
                nombre: '',
                primerApellido: '',
                segundoApellido: '',
                sexo: '',
                estadoNacimiento: '',
                municipioNacimiento: '',
                localidadDeNacimiento: '',
                curp: '',
                fechaNacimiento: '',
                imss: '',
                telefono: '',
                celular: '',
                correo: '',
                constanciaEstudio: '',
                estadoCivil: ''

            }}
            validationSchema={Yup.object({
                nombre: Yup.string().required('Nombre requerido'),
                primerApellido: Yup.string().required('Apellido requerido'),
                segundoApellido: Yup.string().required('Apellido requerido'),
                sexo: Yup.string().required('Sexo requerido'),
                estadoNacimiento: Yup.number().required('Estado requerido'),
                municipioNacimiento: Yup.number().required('Municipio requerido'),
                localidadDeNacimiento: Yup.string().required('Localidad requerido'),
               // constanciaEstudio: Yup.string().required('Requerido'),
                estadoCivil: Yup.string().required('Requerido'),
                fechaNacimiento: Yup.date().required('Fecha requerida'),
                curp: Yup.string().required('Curp requerido').matches(`^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$`, 'Invalidad'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                //console.log(JSON.stringify(values, null, 2))
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'item-nom box-width'}>
                        <TextFields className={'sub-item-nombre'} label={"Nombre*"} name={"nombre"} type={"text"}
                                    placeholder=""/>
                        <TextFields label={"Primer apellido*"} name={"primerApellido"} type={"text"} placeholder=".."/>
                        <TextFields label={"Segundo apellido*"} name={"segundoApellido"} type={"text"}
                                    placeholder=""/>
                    </div>
                    <small className={'item-search-curp'} onClick={openWindowsBrouser}>Consulta tu curp aqui</small>

                    <div className={'item-curp box-width'}>
                        <TextFields label={"Curp*"} name={"curp"} type={"text"} placeholder=".."/>
                        <TextFields label={"Fecha de nacimiento*"} name={"fechaNacimiento"} type={"date"}
                        />
                    </div>
                    <div className={'item-tel box-width'}>
                        <TextFields label={"Número de seguridad social(NSS)"} name={"imss"} type={"text"}
                                    placeholder=".."/>
                        <TextFields label={"Telefono"} name={"telefono"} type={"number"} placeholder=".."/>
                    </div>
                    <div className={'item-correo box-width'}>
                        <TextFields label={"Celular"} name={"celular"} type={"number"} placeholder=".."/>
                        <TextFields label={"Correo"} name={"correo"} type={"email"} placeholder=".."/>
                    </div>
                    <div className={'box-width'}>
                        <SelecSexo label={'Sexo*'} name={'sexo'}/>
                        <SelecEstados setIdEstados={setIdEstados} label={'Estado de nacimiento*'}
                                      name={'estadoNacimiento'}/>
                    </div>
                    <div className={'box-width'}>
                        <SelecMunicipio idEstados={idEstados} label={'Municipio de nacimiento*'}
                                        name={'municipioNacimiento'}/>
                        <TextFields label={'Localidad de nacimiento*'} name={'localidadDeNacimiento'}
                                    placeholder="Ej:piedral, Ejido el .. "/>
                    </div>
                    <div className={'box-width'}>
                        <SelecEstadoCivil label={'Estado civil*'} name={'estadoCivil'}/>
                        {/*<SelecConstanciaEstudio label={'Constancia de estudio*'} name={'constanciaEstudio'}/>*/}
                        <SubirArchivosPdf setFilePdf={setFilePdf} filePdf={filePdf} />
                    </div>
                </LayoutForm>
                <ButtonFormulario isDisabled={filePdf ? false:true} />
            </Form>
        </Formik>
    )
}

function SubirArchivosPdf({setFilePdf,filePdf}) {

    const handleChanges=(evet)=>{
        setFilePdf(evet.target.files)
    }

    return (
        <div style={{width: '100%'}}>
            <input
                style={{display: 'none'}}
                id="contained-button-file"
                type="file"
                accept="application/pdf"
                onChange={handleChanges}
            />
            <label htmlFor="contained-button-file" style={{display:"flex",height:'100%',flexDirection:"column",justifyContent:"center"}}>
                <Button size={'small'} variant="contained" color="primary" startIcon={filePdf ? <DoneAllIcon/>:<PriorityHighIcon/>} component="span">
                    {filePdf ? 'Contancia pdf':'Subir Contancia pdf'}
                </Button>
            </label>

        </div>
    )
}

//setDataState={setDataState} dataState={dataState}
const DatosPersonales = ({handleNext, setDataState, dataState,setFilePdf,filePdf}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState} setFilePdf={setFilePdf} filePdf={filePdf}/>
    </div>)
}


export default DatosPersonales;
