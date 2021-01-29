import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import SelecModalidad from "../../Selects/SelectModalidad";
import SelecCiclo from "../../Selects/SelectCiclo";
import {Button} from "@material-ui/core";
import {ButtonFormulario, Informacion} from "./Informacion";

//setDataState={setDataState} dataState={dataState}
const Formularios = ({handleNext, setDataState, dataState}) => {
    const handlChange = (values) => {
        setDataState({
            ...dataState,
            infperiodo: values
        })
        handleNext()
    }
    return (
        <Formik
            initialValues={{
                modalidad: '',
                ciclo: '',
            }}
            validationSchema={Yup.object({
                modalidad: Yup.string().required('Modalidad requerida'),
                ciclo: Yup.string().required('Ciclo requerido'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                console.log(JSON.stringify(values, null, 2))
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <SelecModalidad label={'Modalidad*'} name={'modalidad'}/>
                        <SelecCiclo label={'Ciclo*'} name={'ciclo'}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>
        </Formik>
    )
}
//setDataState={setDataState} dataState={dataState}
const DatosPeriodo = ({handleNext, setDataState, dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosPeriodo;
