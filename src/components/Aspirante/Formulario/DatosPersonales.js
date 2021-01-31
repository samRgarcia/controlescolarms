import React from "react";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import TextFields from "../../TexFields";
import './css/datosPersonales.css'
import SelecSexo from "../../Selects/SelectSexo";
import SelecEstados from "../../Selects/SelectEstado";
import SelecMunicipio from "../../Selects/SelectMunicipio";
import SelecLocalidad from "../../Selects/SelectLocalidad";
import SelecEstadoCivil from "../../Selects/SelectEstadoCivil";
import SelecConstanciaEstudio from "../../Selects/SelectConstanciaStudio";
import LayoutForm from "../../../childrens/LayoutForm";
import {ButtonFormulario, Informacion} from "./Informacion";

//setDataState={setDataState} dataState={dataState}
const Formularios = ({handleNext, setDataState, dataState}) => {
    const [idEstados, setIdEstados] = React.useState(null);
    const handlChange = (values) => {
        setDataState({...dataState, infoPersonal: values})
        handleNext()
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
                constanciaEstudio: Yup.string().required('Requerido'),
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
                                    placeholder="Doe"/>
                        <TextFields label={"Primer apellido*"} name={"primerApellido"} type={"text"} placeholder=".."/>
                        <TextFields label={"Segundo apellido*"} name={"segundoApellido"} type={"text"}
                                    placeholder=".."/>
                    </div>
                    <div className={'item-curp box-width'}>
                        <TextFields label={"Curp*"} name={"curp"} type={"text"} placeholder=".."/>
                        <TextFields label={"Fecha de nacimiento*"} name={"fechaNacimiento"} type={"date"}
                                    placeholder=".."/>
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
                        <TextFields label={'Localidad de nacimiento*'} name={'localidadDeNacimiento'}/>
                    </div>
                    <div className={'box-width'}>
                        <SelecEstadoCivil label={'Estado civil*'} name={'estadoCivil'}/>
                        <SelecConstanciaEstudio label={'Constancia de estudio*'} name={'constanciaEstudio'}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>
        </Formik>
    )
}
//setDataState={setDataState} dataState={dataState}
const DatosPersonales = ({handleNext, setDataState, dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosPersonales;
