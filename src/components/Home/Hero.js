import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {useHistory} from 'react-router-dom'
import Backg from '../../Img/back.jpg';
import Logos from '../../Img/back.jpg';

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
                SISTEMA DE PREINSCRIPCIONES EN LINEA CICLO 2021-2022
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                ...
            </Typography>
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
            <Typography variant="body2" color="inherit" className={classes.more}>
                .
            </Typography>
        </ProductHeroLayout>
    );
}


export default withStyles(styles)(ProductHero);
