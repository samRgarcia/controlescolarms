import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useField} from "formik";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function TextFields({label = '', ...props}) {
    const classes = useStyles();
    const [field, meta] = useField(props);
    const [error, setError] = React.useState(false)

    return (
        <>
            <TextField
                style={{marginLeft:'5px'}}
                fullWidth
                error={meta.touched && meta.error ? true : false}
                label={label}
                {...field}
                {...props}
                helperText={meta.touched && meta.error ? meta.error : null}
            />
        </>
    );
}
