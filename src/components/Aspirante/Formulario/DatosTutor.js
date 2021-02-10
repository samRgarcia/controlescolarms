import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import TextFields from "../../TexFields";
import {ButtonFormulario, Informacion} from "./Informacion";

const Formularios = ({handleNext, setDataState, dataState}) => {

    const handlChange = (values) => {
        setDataState({
            ...dataState,
            infTutor: values
        })
        handleNext()
    }
    return (
        <Formik
            initialValues={{
                nombre: '',
                telefono: '',
                correo: '',
                direccion: '',
            }}
            validationSchema={Yup.object({
                nombre: Yup.string().required('Nombre requerido'),
                telefono: Yup.number().required('Teléfono requerido'),
                direccion: Yup.string().required('Dirección requerida'),

            })}
            onSubmit={(values, {setSubmitting}) => {
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <TextFields label={"Nombre completo*"} name={"nombre"} type={"text"} toUpperCase={true} placeholder=""/>
                        <TextFields label={"Teléfono*"} name={"telefono"} type={"number"} placeholder=""/>
                    </div>
                    <div className={'box-width'}>
                        <TextFields label={"Correo"} name={"correo"} type={"email"} toUpperCase={true} placeholder=""/>
                        <TextFields label={"Direción*"} name={"direccion"} type={"text"} toUpperCase={true} placeholder=""/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>

        </Formik>
    )
}



const DatosTutor = ({handleNext, setDataState, dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosTutor;
