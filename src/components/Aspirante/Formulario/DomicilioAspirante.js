import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import './css/datosPersonales.css'
import LayoutForm from "../../../childrens/LayoutForm";
import TextFields from "../../TexFields";
import SelecEstados from "../../Selects/SelectEstado";
import SelecMunicipio from "../../Selects/SelectMunicipio";
import {ButtonFormulario, Informacion} from "./Informacion";

const Formularios = ({handleNext, setDataState, dataState}) => {
    const [idEstados, setIdEstados] = React.useState(null);

    const handlChange = (values) => {
        setDataState({
            ...dataState,
            direccion: values
        })
        handleNext()
    }
    return (
        <Formik
            initialValues={{
                cp: '',
                colonia: '',
                calleNumero: '',
                estado: '',
                municipio: '',
                localidad: ''
            }}
            validationSchema={Yup.object({
                estado: Yup.number().required('Estado requerido'),
                municipio: Yup.number().required('Municipio requerido'),
                localidad: Yup.string().required('Localidad requerida'),

            })}
            onSubmit={(values, {setSubmitting}) => {
                //console.log(JSON.stringify(values, null, 2))
                handlChange(values);
                setSubmitting(false)
            }}>
            <Form>
                <LayoutForm>
                    <div className={'box-width'}>
                        <TextFields label={"C.p."} name={"cp"} type={"text"} toUpperCase={true} placeholder=".."/>
                        <TextFields label={"Colonia"} name={"colonia"} type={"text"} toUpperCase={true} placeholder=".."/>
                    </div>
                    <div className={'box-width'}>
                        <TextFields label={"Calle y Numero"} name={"calleNumero"} toUpperCase={true} type={"text"} placeholder=".."/>
                        <SelecEstados setIdEstados={setIdEstados} label={'Estado*'} name={'estado'}/>
                    </div>
                    <div className={'box-width'}>
                        <SelecMunicipio idEstados={idEstados} label={'Municipio*'} name={'municipio'}/>
                        <TextFields label={'Localidad*'} name={'localidad'} toUpperCase={true}/>
                    </div>
                </LayoutForm>
                <ButtonFormulario/>
            </Form>

        </Formik>
    )
}



//setDataState={setDataState} dataState={dataState}
const DatosDomicilios = ({handleNext, setDataState, dataState}) => {
    return (<div>
        <Informacion/>
        <Formularios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>
    </div>)
}


export default DatosDomicilios;
