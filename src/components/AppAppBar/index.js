import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import Toolbar, { styles as toolbarStyles } from './Toolbar';
import {Link} from 'react-router-dom';

const styles = (theme) => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
});

function AppAppBar(props) {
    const { classes } = props;

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar size={'small'}  className={classes.toolbar}>
                    <div className={classes.left} />
                    <h6
                        underline="none"
                        color="inherit"
                        className={classes.title}
                    >
                        {'Control escolar'}
                    </h6>
                    <div className={classes.right}>
                        <Link
                            className={classes.rightLink}
                            to={'/login'}
                        >
                            {'Administrador'}
                        </Link>
                        {/*<Link
                            variant="h6"
                            underline="none"
                            className={clsx(classes.rightLink, classes.linkSecondary)}
                        >
                            {'Sign Up'}
                        </Link>*/}
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder} />
        </div>
    );
}

AppAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
