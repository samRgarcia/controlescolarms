import React, {useEffect, useMemo} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useField} from "formik";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {LISTA_MUNICIPIOS} from "../../constant";

const SelecMunicipio = ({idEstados,label = '', ...props}) => {
    const [field, meta] = useField(props);
    const [municipios, setMunicipios] = React.useState([])

    useEffect(() => {
        console.log("muni",idEstados)
       idEstados &&  axios.get(LISTA_MUNICIPIOS,{params:{id:idEstados}})
            .then((res) => {
                setMunicipios(res.data);
            }).catch(error=>console.log(error))
    }, [idEstados]);

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
                    municipios.map(item=>{
                        return  <option key={item.idMunicipio} value={item.idMunicipio}>{item.nombreMunicipio}</option>
                    })
                }
            </Select>
            <FormHelperText>{meta.touched && meta.error ? meta.error : null}</FormHelperText>
        </FormControl>
    )
}

export default SelecMunicipio;
