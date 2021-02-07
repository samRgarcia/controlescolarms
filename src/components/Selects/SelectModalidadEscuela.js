import React, {useEffect} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useField} from "formik";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {LISTA_MODALIDAD, LISTA_MODALIDAD_ESCUELA} from "../../constant";

const SelecModalidadEscuela = ({label = '', ...props}) => {
    const [field, meta] = useField(props);
    const [modalida,setModalidad] = React.useState([])

    useEffect(()=>{
        axios.get(LISTA_MODALIDAD_ESCUELA)
            .then(res=>{
                setModalidad(res.data)
            })
            .catch(err=>console.log(err))
    },[])

    return (
        <FormControl style={{marginLeft:'5px'}} fullWidth error={meta.touched && meta.error ? true:false}>
            <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
            <Select
                native
                {...field}
                {...props}
            >
                <option aria-label="None" value=""/>
                {
                    modalida.map(item=>{
                        return <option key={item.idmodalidad} value={item.idmodalidad}>{item.descripcion}</option>
                    })
                }
            </Select>
            <FormHelperText>{meta.touched && meta.error ? meta.error:null}</FormHelperText>
        </FormControl>
    )
}

export default SelecModalidadEscuela;
