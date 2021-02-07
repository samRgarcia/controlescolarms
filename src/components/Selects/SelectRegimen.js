import React, {useEffect, useState} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useField} from "formik";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {LISTA_REGIMEN} from "../../constant";

const SelecRegimen = ({label = '', ...props}) => {
    const [field, meta] = useField(props);
    const [regimen,setRegimen]=useState([]);

    useEffect(() => {
        axios.get(LISTA_REGIMEN)
            .then(res=>setRegimen(res.data))
            .catch(error=>console.log(error))
    }, [])

    return (
        <FormControl style={{marginLeft: '5px'}} fullWidth error={meta.touched && meta.error ? true : false}>
            <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
            <Select
                native
                {...field}
                {...props}
            >
                <option aria-label="None" value=""/>
                {
                    regimen.map(item=> <option key={item.idregimen} value={item.idregimen}>{item.descripcion}</option>)
                }
            </Select>
            <FormHelperText>{meta.touched && meta.error ? meta.error : null}</FormHelperText>
        </FormControl>
    )
}

export default SelecRegimen;
