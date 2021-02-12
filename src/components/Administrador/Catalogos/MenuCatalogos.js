import React, {useCallback, useEffect, useMemo} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CatCiclo from "./Item/CatCiclo";
import CatModalidad from "./Item/CatModalidad";
import axios from "axios";
import {ADMIN_LISTA_CAT_CARRERA, ADMIN_LISTA_CAT_MODALIDAD} from "../../../constant";
import CatCarrera from "./Item/CatCarrera";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function MenuCatalogos() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [modalidad, setModalidad] = React.useState([]);
    const [carrera, setCarrera] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isModalidad,setIsModalidad] = React.useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get(ADMIN_LISTA_CAT_MODALIDAD)
            .then(res => {
                setModalidad(res.data)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [isModalidad])

    useEffect(() => {
        setLoading(true)
        axios.get(ADMIN_LISTA_CAT_CARRERA)
            .then((res) => setCarrera(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Modalidad" {...a11yProps(0)} />
                <Tab label="Ciclo" {...a11yProps(1)} />
                <Tab label="Carreras" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <CatModalidad loading={loading} modalidad={modalidad} setLoading={setLoading}
                              setModalidad={setModalidad} setIsModalidad={setIsModalidad} isModalidad={isModalidad}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CatCiclo modalidad={modalidad}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CatCarrera setLoading={setLoading} loading={loading} carrera={carrera} setCarrera={setCarrera}/>
            </TabPanel>
        </div>
    );
}
