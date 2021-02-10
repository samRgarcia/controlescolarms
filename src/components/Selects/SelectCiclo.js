import React, {useEffect} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useField} from "formik";
import {FormHelperText} from "@material-ui/core";
import axios from "axios";
import {LISTA_CICLO} from "../../constant";

const SelecCiclo = ({label = '', ...props}) => {
    const [field, meta] = useField(props);
    const [ciclos, setCiclos] = React.useState([]);

    useEffect(() => {
        axios.get(LISTA_CICLO,{params: {idCbtas: 1}}).then((res) => {
            setCiclos(res.data)
        })
            .catch(error => console.log(error))
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
                    ciclos.map(item=>{
                        return <option key={item.id} value={item.id}>{`${item.nomciclo} ${item.catmodalidads.nommodalidad}`}</option>
                    })
                }
            </Select>
            <FormHelperText>{meta.touched && meta.error ? meta.error : null}</FormHelperText>
        </FormControl>
    )
}

export default SelecCiclo;
