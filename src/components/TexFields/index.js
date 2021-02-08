import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useField} from "formik";



export default function TextFields({label = '', ...props}) {
    const [field, meta] = useField(props);
    const [error, setError] = React.useState(false)
    const fieldValue = {...field, value: field.value.toUpperCase()}
    return (
        <>
            <TextField
                InputLabelProps={{shrink: true}}
                style={{marginLeft: '5px'}}
                fullWidth
                error={meta.touched && meta.error ? true : false}
                label={label}
                {...fieldValue}
                {...props}
                helperText={meta.touched && meta.error ? meta.error : null}
            />
        </>
    );
}
