import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import {useHistory} from 'react-router-dom'
import Backg from '../../Img/back.jpg';
let imgs ="https://pixabay.com/get/g9e84141a2a8f0b8e756ab4051c7e775ba917ebc7dbfd7afa9e186e84e23b4738ccc39eaa46116e3f0ca0e6bca5b01bdf_1280.jpg"
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
            <img style={{display: 'none'}} src={backgroundImage} alt="increase priority"/>
            <Typography color="inherit" align="center" variant="h2" marked="center">
                PREINSCRIPCIONES SEMESTRE AGOSTO 2021
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
