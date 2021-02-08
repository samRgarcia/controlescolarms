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
                telefono: Yup.number().required('Telefono requerido'),
                direccion: Yup.string().required('Direccion requerido'),

            })}
            onSubmit={(values, {setSubmitting}) => {
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <TextFields label={"Nombre*"} name={"nombre"} type={"text"} placeholder=""/>
                        <TextFields label={"Telefono*"} name={"telefono"} type={"number"} placeholder=""/>
                    </div>
                    <div className={'box-width'}>
                        <TextFields label={"Correo"} name={"correo"} type={"email"} placeholder=""/>
                        <TextFields label={"Direcion*"} name={"direccion"} type={"text"} placeholder=""/>
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
