import React, {useEffect, useMemo} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useField} from "formik";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {LISTA_ESTADO} from "../../constant";

const SelecEstados = ({setIdEstados,label = '', ...props}) => {
    const [field, meta] = useField(props);
    const [estados, setEstados] = React.useState([]);

    useEffect(() => {
        axios.get(LISTA_ESTADO).then((res) => {
            setEstados(res.data);
        })
            .catch(erro => console.log(erro))
    }, [])

    useMemo(() => {
        field.value && setIdEstados(field.value);
        console.log(field.value)
    }, [field.value])

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
                    estados.map(item => {
                        return <option key={item?.idEstado} value={item?.idEstado}>{item?.nombreEstado}</option>
                    })
                }
            </Select>
            <FormHelperText>{meta.touched && meta.error ? meta.error : null}</FormHelperText>
        </FormControl>
    )
}

export default SelecEstados;
