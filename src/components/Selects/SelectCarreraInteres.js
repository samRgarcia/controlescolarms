import React, {useEffect} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useField} from "formik";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {LISTA_CARRERAS_INTERES} from "../../constant";

const SelecCarreraInteres = ({label = '', ...props}) => {
    const [field, meta] = useField(props);
    const [carreras,setCarreras]=React.useState([]);
    useEffect(()=>{
        axios.get(LISTA_CARRERAS_INTERES,{
            params:{
                idCebetas:1
            }
        })
            .then(res=>setCarreras(res.data))
            .catch(error=>console.log(error))
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
                    carreras.map(item=><option key={item.idcarreras} value={item.idcarreras}>{item.descripcion}</option>)
                }
            </Select>
            <FormHelperText>{meta.touched && meta.error ? meta.error:null}</FormHelperText>
        </FormControl>
    )
}

export default SelecCarreraInteres;
