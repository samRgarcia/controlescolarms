import React, {useEffect, useMemo, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import TextFields from "../TexFields";
import axios from "axios";
import {useSnackbar} from 'notistack';
import {VALIDAR_LOGIN} from "../../constant";
import {setUserID, setToken, decodedToken, isExpired} from '../../services/AuthServices';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    let history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (!isExpired()) {
            history.replace('/login')
        }
    }, [])

    const Redireccion = React.useCallback(async ({password, usuario}) => {
        try {
            const res = await axios.post(VALIDAR_LOGIN, {
                usuario: usuario,
                password: password
            })
            //console.log(res)
            await setToken(res.data.token);
            const {userId} = await decodedToken()
            await setUserID(userId)
            history.replace('/dashboard')
        } catch (e) {
            console.log(e)
            enqueueSnackbar('Usuario o contraseña incorrecta.',
                {
                    variant: 'warning',
                    preventDuplicate: true,
                })
        }
    }, [])

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Administrador
                </Typography>
                <div className={classes.form}>
                    <Formik
                        initialValues={{password: '', usuario: ''}}
                        validationSchema={Yup.object({
                            usuario: Yup.string().required('Ingrese su usuario'),
                            password: Yup.string().required('Ingrese su contraseña')
                        })}
                        onSubmit={async (values, {setSubmitting}) => {
                            //console.log(JSON.stringify(values, null, 2))
                            await Redireccion(values);
                            setSubmitting(false)
                        }}
                    >
                        <Form>
                            <TextFields label={'Usuario'} name={"usuario"} type={'text'}/>
                            <TextFields label={'Contraseña'} name={"password"} type={'password'}/>

                            <FormControlLabel
                                disabled
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </Form>
                    </Formik>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
