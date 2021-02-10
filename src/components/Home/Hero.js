import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {useHistory} from 'react-router-dom'
import Backg from '../../Img/back.jpg';
import {
    Button as ButtonM,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import LayoutForm from "../../childrens/LayoutForm";
import TextFields from "../TexFields";
import {dataComprobanteCurp} from '../Aspirante/Reportes/comprobante';
import Loaders from '../Loader';

const backgroundImage = Backg;
    //'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const styles = (theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
});

function ProductHero(props) {
    const { classes } = props;
    let history =useHistory();

    const HandlChangeForm=()=>{
        history.push("/registro")
    }
    return (

            <ProductHeroLayout backgroundClassName={classes.background}>
                {/* Increase the network loading priority of the background image. */}
                {/*<img style={{display: 'none'}} src={backgroundImage} alt="increase priority"/>*/}
                <Typography color="inherit" align="center" variant="h3" marked="center">
                    SISTEMA DE PREINSCRIPCIONES EN LÍNEA CICLO 2021-2022
                </Typography>
                <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                    ...
                </Typography>
                <div style={{display:"flex"}}>
                    <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        className={classes.button}
                        component="a"
                        onClick={HandlChangeForm}
                    >
                        Registrate aqui
                    </Button>
                    <CurpDescargar classes={classes}/>
                </div>

                <Typography variant="body2" color="inherit" className={classes.more}>
                    .
                </Typography>
            </ProductHeroLayout>


    );
}

function CurpDescargar(props) {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);
    const [isLoader,setIsloader]=React.useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descargarCurp= async ({curp})=>{
        setIsloader(true)
        handleClose()
       await dataComprobanteCurp(curp)
        setIsloader(false)

    }

    return (
        <div>
            <Loaders open={isLoader}/>
            <Button
                color="green"
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
                onClick={handleClickOpen}
            >
                Reimprimir ficha
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Reimprimir ficha"}</DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description" >

                    <Formik
                        initialValues={{
                            curp:'',
                        }}
                        validationSchema={Yup.object({
                            curp: Yup.string().required('Curp requerida').matches(`^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$`, 'Invalidad'),
                        })}
                        onSubmit={(values, {setSubmitting}) => {
                            descargarCurp(values);
                            setSubmitting(false)
                        }}>
                        <Form>
                                <div style={{width:'300px',marginBottom:'7px'}}>
                                    <TextFields label={'Curp'} name={'curp'}/>
                                </div>
                            <ButtonM type={"submit"} color="primary">
                                Descargar
                            </ButtonM>
                            <ButtonM onClick={handleClose} color="primary">
                                Cerrar
                            </ButtonM>
                        </Form>
                    </Formik>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}


export default withStyles(styles)(ProductHero);
