import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import SelecEstados from "../../Selects/SelectEstado";
import SelecMunicipio from "../../Selects/SelectMunicipio";
import SelecRegimen from "../../Selects/SelectRegimen";
import {ButtonFormulario, Informacion} from "./Informacion";
import SelecModalidadEscuela from "../../Selects/SelectModalidadEscuela";

//setDataState={setDataState} dataState={dataState}
const Formularios = ({handleNext,setDataState,dataState}) => {
    const [idEstados, setIdEstados] = React.useState(null);

    const handlChange = (values) => {
        setDataState({
            ...dataState,
            infProcedencia:values
        })
        handleNext()
    }
    return (
        <Formik
            initialValues={{
                estado:'',
                municipio:'',
                modalidad:'',
                regimen:'',
            }}
            validationSchema={Yup.object({
                estado: Yup.string().required('Estado requerido'),
                municipio: Yup.string().required('Municipio requerido'),
                modalidad: Yup.string().required('Modalidad requerida'),
                regimen: Yup.string().required('Régimen requerido'),

            })}
            onSubmit={(values, {setSubmitting}) => {
                //console.log(JSON.stringify(values, null, 2))
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <SelecEstados setIdEstados={setIdEstados} label={'Estado*'} name={'estado'}/>
                        <SelecMunicipio idEstados={idEstados} label={'Municipio*'} name={'municipio'}/>
                    </div>
                    <div className={'box-width'}>
                        <SelecModalidadEscuela label={'Modalidad*'} name={'modalidad'}/>
                        <SelecRegimen label={'Régimen*'} name={'regimen'}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>
        </Formik>
    )
}
// setDataState={setDataState} dataState={dataState}
const DatosProcedencia = ({handleNext,setDataState,dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosProcedencia;
