import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatosPersonales from "./DatosPersonales";
import DatosPeriodo from "./Periodo";
import DatosDomicilios from "./DomicilioAspirante";
import DatosProcedencia from "./EscuelaProcedencia";
import DatosCarrera from "./CarreraDeInteres";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Periodo', 'Datos personales', 'Domicilio','Escuela Procedencia','Carrera de interés'];
}

function getStepContent(stepIndex,handleNext,setDataState,dataState) {
    switch (stepIndex) {
        case 0:
            return <DatosPeriodo handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>;
        case 1:
            return <DatosPersonales handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>;
        case 2:
            return <DatosDomicilios handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>;
        case 3:
            return <DatosProcedencia handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>;
        case 4:
            return <DatosCarrera handleNext={handleNext} setDataState={setDataState} dataState={dataState}/>;
        default:
            return 'Unknown stepIndex';
    }
}

export default function MenuPasos() {
    const classes = useStyles();
    let history = useHistory();
    const [dataState,setDataState]=React.useState({infoPersonal:[],direccion:[],infperiodo:[],infProcedencia:[],infCarrera:[]})
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        // TODO: Enviar la informacion al back y confirmar
        console.log('my',dataState)
        history.push('/')
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div style={{textAlign:'center'}}>
                        <Typography className={classes.instructions}>Confirma para enviar tus datos</Typography>
                        <Button color={"secondary"} onClick={handleReset}>Enviar</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep,handleNext,setDataState,dataState)}</Typography>
                        {/*<div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>*/}
                    </div>
                )}
            </div>
        </div>
    );
}
