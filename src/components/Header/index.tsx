import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "../../assets/icons/hamburger.svg";
import ConnectButton from "./connect-button";
import "./header.scss";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";
import logoIcon from "../../assets/icons/logo.png";
import classnames from "classnames";

interface IHeader {
    handleDrawerToggle: () => void;
    drawe: boolean;
}

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            // padding: "20px 0 30px 0",
        },
        justifyContent: "flex-end",
        alignItems: "flex-end",
        background: "transparent",
        backdropFilter: "none",
        zIndex: 10,
        margin: "5px",
        marginLeft: "0px",
    },
    topBar: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_DURATION,
        }),
    },
    topBarShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: 0,
    },
}));

function Header({ handleDrawerToggle, drawe }: IHeader) {
    const [isActive] = useState();
    const classes = useStyles();
    const isVerySmallScreen = useMediaQuery("(max-width: 400px)");
    const isWrapShow = true; // useMediaQuery("(max-width: 480px)");

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("gameplay") >= 0 && page === "gameplay") {
            return true;
        }
        if (currentPath.indexOf("dao") >= 0 && page === "dao") {
            return true;
        }
        if (currentPath.indexOf("beta") >= 0 && page === "beta") {
            return true;
        }
        if (currentPath.indexOf("minting") >= 0 && page === "minting") {
            return true;
        }
        if (currentPath.indexOf("staking") >= 0 && page === "staking") {
            return true;
        }
        if (currentPath.indexOf("token") >= 0 && page === "token") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className={`${classes.topBar} ${!drawe && classes.topBarShift}`}>
            <AppBar position="sticky" className={classes.appBar} elevation={0}>
                <Toolbar disableGutters className="dapp-topbar">
                    <div onClick={handleDrawerToggle} className="dapp-topbar-slider-btn">
                        <img src={MenuIcon} alt="" />
                    </div>
                    <div className="dapp-topbar-btns-wrap">
                        <ConnectButton />
                    </div>
                    <Grid container spacing={3} className="dapp-topbar-links-wrap">
                        <Grid item xs container>
                            <Grid item xs={4}>
                                <Link
                                    component={NavLink}
                                    to="/gameplay"
                                    isActive={(match: any, location: any) => {
                                        return checkPage(location, "gameplay");
                                    }}
                                >
                                    <div className={classnames("link-item", { active: false })}>Gameplay</div>
                                </Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Link                                    
                                    href="https://snapshot.org/#/blockways.eth" target="_blank"
                                    // component={NavLink}
                                    // to="/dao"
                                    // isActive={(match: any, location: any) => {
                                    //     return checkPage(location, "dao");
                                    // }}
                                >
                                    <div className={classnames("link-item", { active: false })}>DAO</div>
                                </Link>
                            </Grid>
                            <Grid item xs={4}>
                                <Link
                                    component={NavLink}
                                    to="/beta"
                                    isActive={(match: any, location: any) => {
                                        return checkPage(location, "beta");
                                    }}
                                >
                                    <div className={classnames("link-item", { active: false })}>Beta</div>
                                </Link>
                            </Grid>
                            <Grid item xs={3} style={{display: "none"}}>
                                <Link
                                    component={NavLink}
                                    to="/token"
                                    isActive={(match: any, location: any) => {
                                        return checkPage(location, "token");
                                    }}
                                >
                                    <div className={classnames("link-item", { active: false })}>Token</div>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} className="img-grid">
                            <Link
                                component={NavLink}
                                to="/dashboard"                                
                            >
                                <img src={logoIcon} alt="" />
                            </Link>
                        </Grid>
                        <Grid item xs container>
                            <Grid item xs={4}>
                                <Link
                                    component={NavLink}
                                    to="/minting"
                                    isActive={(match: any, location: any) => {
                                        return checkPage(location, "minting");
                                    }}
                                >
                                    <div className={classnames("link-item", { active: false })}>Minting</div>
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link
                                    component={NavLink}
                                    to="/staking"
                                    isActive={(match: any, location: any) => {
                                        return checkPage(location, "staking");
                                    }}
                                >
                                    <div className={classnames("link-item", { active: false })}>Staking</div>
                                </Link>
                            </Grid>
                            <Grid item xs={5}>
                                <ConnectButton />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
