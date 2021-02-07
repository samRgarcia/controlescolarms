import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import SelecCarreraInteres from "../../Selects/SelectCarreraInteres";
import {Button} from "@material-ui/core";
import {ButtonFormulario, Informacion} from "./Informacion";
import TextFields from "../../TexFields";

//setDataState={setDataState} dataState={dataState}
const Formularios = ({handleNext,setDataState,dataState}) => {
    const handlChange = (values) => {
        setDataState({
            ...dataState,
            infCarrera:values
        })
        handleNext()
    }
    return (
        <Formik
            initialValues={{
                carreraInteres:'',
            }}
            validationSchema={Yup.object({
                carreraInteres: Yup.string().required('Carrera de insteres requerido'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                //console.log(JSON.stringify(values, null, 2))
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <SelecCarreraInteres label={'Carrera de interes*'} name={'carreraInteres'}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>
        </Formik>
    )
}
//setDataState={setDataState} dataState={dataState}
const DatosCarrera = ({handleNext,setDataState,dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosCarrera;
