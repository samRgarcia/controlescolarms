import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import TextFields from "../../TexFields";
import SelecEstados from "../../Selects/SelectEstado";
import SelecMunicipio from "../../Selects/SelectMunicipio";
import SelecLocalidad from "../../Selects/SelectLocalidad";
import {Button} from "@material-ui/core";
import {ButtonFormulario, Informacion} from "./Informacion";

//setDataState={setDataState} dataState={dataState}
const Formularios = ({handleNext,setDataState,dataState}) => {
    const [idEstados, setIdEstados] = React.useState(null);

    const handlChange = (values) => {
        setDataState({
            ...dataState,
            direccion:values
        })
        handleNext()
    }
    return (
        <Formik
            initialValues={{
                cp: '',
                colonia: '',
                calleNumero:'',
                estado:'',
                municipio:'',
                localidad:''
            }}
            validationSchema={Yup.object({
                estado: Yup.string().required('Estado requerido'),
                municipio: Yup.string().required('Municipio requerido'),
                localidad: Yup.string().required('Localidad requerido'),

            })}
            onSubmit={(values, {setSubmitting}) => {
                //console.log(JSON.stringify(values, null, 2))
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <TextFields label={"C.p"} name={"cp"} type={"text"} placeholder=".."/>
                        <TextFields label={"Colinia"} name={"colonia"} type={"text"} placeholder=".."/>
                    </div>
                    <div className={'box-width'}>
                        <TextFields label={"Calle y Numero"} name={"calleNumero"} type={"text"} placeholder=".."/>
                        <SelecEstados setIdEstados={setIdEstados} label={'Estado*'} name={'estado'}/>
                    </div>
                    <div className={'box-width'}>
                        <SelecMunicipio idEstados={idEstados} label={'Municipio*'} name={'municipio'}/>
                        <TextFields label={'Localidad*'} name={'localidad'}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>

        </Formik>
    )
}
//setDataState={setDataState} dataState={dataState}
const DatosDomicilios = ({handleNext,setDataState,dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosDomicilios;
