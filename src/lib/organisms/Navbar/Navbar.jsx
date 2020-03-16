import React, { useState } from "react";

import { connect } from "react-redux";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 0,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('lg')]: {
            display: 'none',
        },
    },
    background: {
        backgroundColor: '#FCB41A',
        display: 'flex',
        justifyContent: 'space-between'
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: "#333",
        fontSize: 16
    },
}));

function Navbar({ openMenu, nameCourse }) {

    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const [siglaUsuario] = useState('AU');

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = async (action) => {
        setAnchorEl(null);
        handleMobileMenuClose();

    };

    const openCourses = () => {
        window.location.href = "/courses"; 
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Conta</MenuItem>
            <MenuItem onClick={openCourses}>Meus cursos</MenuItem>
            {/* <MenuItem onClick={User.logout}>Sair</MenuItem> */}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {/* <Avatar alt="Marcos Ferreira" className={classes.large} src="https://scontent.fvix1-1.fna.fbcdn.net/v/l/t1.0-9/p960x960/44932796_2029164450476851_9146156620886048768_o.jpg?_nc_cat=107&_nc_ohc=x7lnh4qgrc4AX_sFwZr&_nc_ht=scontent.fvix1-1.fna&_nc_tp=6&oh=1136a3c3eee5840e7966ff7f7d5ee2d6&oe=5ED33663" /> */}
                    <Avatar className={classes.purple}>OP</Avatar>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        
        <div className={classes.grow}>

            <AppBar position="fixed" className={classes.background}>
                {/* <ThemeProvider theme={theme}> */}
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        {openMenu ?
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={openMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            : null
                        }
                        <Typography className={classes.title} variant="h6" noWrap>
                            {nameCourse}
                        </Typography>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/* <Avatar alt="Marcos Ferreira" className={classes.large} src="https://scontent.fvix1-1.fna.fbcdn.net/v/l/t1.0-9/p960x960/44932796_2029164450476851_9146156620886048768_o.jpg?_nc_cat=107&_nc_ohc=x7lnh4qgrc4AX_sFwZr&_nc_ht=scontent.fvix1-1.fna&_nc_tp=6&oh=1136a3c3eee5840e7966ff7f7d5ee2d6&oe=5ED33663" /> */}
                            <Avatar className={classes.purple}>{siglaUsuario}</Avatar>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {/* <Avatar alt="Marcos Ferreira" className={classes.large} src="https://scontent.fvix1-1.fna.fbcdn.net/v/l/t1.0-9/p960x960/44932796_2029164450476851_9146156620886048768_o.jpg?_nc_cat=107&_nc_ohc=x7lnh4qgrc4AX_sFwZr&_nc_ht=scontent.fvix1-1.fna&_nc_tp=6&oh=1136a3c3eee5840e7966ff7f7d5ee2d6&oe=5ED33663" /> */}
                            <Avatar className={classes.purple}>{siglaUsuario}</Avatar>
                        </IconButton>
                    </div>
                </Toolbar>

                {/* </ThemeProvider> */}
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}


// const mapStateToProps = state => ({
// 	perfil: state.perfilState.perfil,
// });

export default connect()(Navbar);
