import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import SelecModalidad from "../../Selects/SelectModalidad";
import {ButtonFormulario, Informacion} from "./Informacion";

//setDataState={setDataState} dataState={dataState}
const Formularios = ({handleNext, setDataState, dataState,ciclos}) => {

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
                ciclo:'',
            }}
            validationSchema={Yup.object({
                modalidad: Yup.string().required('Modalidad requerida'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                values.ciclo=ciclos.id
                console.log(values)
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <SelecModalidad label={'Modalidad*'} name={'modalidad'}/>
                        <VistaClico valueCiclo={ciclos.nombre}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>
        </Formik>
    )
}
function VistaClico({valueCiclo}) {
    return <h4 style={{width:'100%',textAlign:'center'}}>{valueCiclo || '--'}</h4>
}
//setDataState={setDataState} dataState={dataState}
const DatosPeriodo = ({handleNext, setDataState, dataState,ciclos}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState} ciclos={ciclos}/>
    </div>)
}


export default DatosPeriodo;
