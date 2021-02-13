import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import {useHistory} from "react-router-dom";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import TextFields from "../TexFields";
import axios from "axios";
import {useSnackbar} from 'notistack';
import {VALIDAR_LOGIN} from "../../constant";
import * as Auth from '../../services/AuthServices';
import {setUserID, setToken, decodedToken} from '../../services/AuthServices';
import Fondo from '../../Img/so-white.png';

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
    container: {
        boxShadow: '-13px 12px 54px -6px rgb(0 0 0 / 6%)',
        borderRadius: '13px',
        backgroundColor: 'white'

    },
    fomulario: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    page: {
        backgroundImage: `url(${Fondo})`,
        height: '100vh',
        width: '100%',
        position: 'absolute',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function Login() {
    const classes = useStyles();
    let history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (!Auth.isExpired()) {
            history.replace('/dashboard')
        }
    }, [])

    const Redireccion = React.useCallback(async ({password, usuario}) => {
        try {
            setIsLoading(true)
            const res = await axios.post(VALIDAR_LOGIN, {
                usuario: usuario,
                password: password
            })
            //console.log(res)
            await setToken(res.data.token);
            const {userId} = await decodedToken()
            await setUserID(userId)
            setIsLoading(false)
            history.replace('/dashboard');
        } catch (e) {
            console.log(e)
            setIsLoading(false)
            enqueueSnackbar('Usuario o contraseña incorrecta.',
                {
                    variant: 'warning',
                    preventDuplicate: true,
                })
        }
    }, [])

    return (
        <div className={classes.page}>

            <Container className={classes.container} component="main" maxWidth="xs">

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
                            <Form className={classes.fomulario}>
                                <TextFields label={'Usuario'} name={"usuario"} type={'text'}
                                            placeholder={"miusuario@gmail.com"}/>
                                <TextFields label={'Contraseña'} name={"password"} type={'password'}
                                            placeholder={"*********"}/>

                                {/*<FormControlLabel
                                disabled
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />*/}
                                <div className={classes.wrapper}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    className={classes.submit}
                                >
                                    Ingresar
                                </Button>
                                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                            </Form>
                        </Formik>

                        {/*<Grid container>
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
                    </Grid>*/}
                    </div>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </div>

    );
}
