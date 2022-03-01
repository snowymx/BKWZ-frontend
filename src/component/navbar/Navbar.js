import React from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import logo from '../../assets/LOGO_MIDDLE.png';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
    backgroundColor: "black",
    'border-radius': "25px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
  },
  logoText: {
    cursor: "pointer",
    color: "black",
    fontSize: 30,
    marginLeft: theme.spacing(1),
  },
  logoImg: {
    cursor: "pointer",
    maxHeight: 50,
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: "white",
    margin: 10,
    fontSize: 20,
    height: 70,
    padding: 20,
    "&:hover": {
      background: "linear-gradient(180deg, #FF9600 0%, #FF9600 100%)",
      border: "1px solid rgba(255, 255, 255, 0.19)",
      'box-sizing': "border-box",
      'border-radius': "25px",
      color: 'black',
    },
    "&.active": {
      background: "linear-gradient(180deg, #FF9600 0%, #FF9600 100%)",
      border: "1px solid rgba(255, 255, 255, 0.19)",
      'box-sizing': "border-box",
      'border-radius': "25px",
      color: 'black',
    },
  },
  root: {
    backgroundColor: "transparent",
    padding: "2em",
    'box-shadow': "none",

  }
}));

function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [selectIndex, setValue] = React.useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  function handleChangeIndex(index) {
    setValue(index);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <CssBaseline />
      <Toolbar>
        <div className={classes.navlinks}>
          <Link to="/gameplay" className={classes.link + (selectIndex ==1?" active": "")} onClick={() => handleChangeIndex(1)}>
            Gameplay
          </Link>
          <Link to="/dao" className={classes.link + (selectIndex ==2?" active": "")} onClick={() => handleChangeIndex(2)}>
            DAO
          </Link>
          <Link to="/beta" className={classes.link + (selectIndex ==3?" active": "")} onClick={() => handleChangeIndex(3)}>
            Beta
          </Link>
          <Link to="/token" className={classes.link + (selectIndex ==4?" active": "")} onClick={() => handleChangeIndex(4)}>
            Token
          </Link>
          <div className={classes.logo} onClick={()=> {history.push("/"); handleChangeIndex(0)}}>
              <img src={logo} alt="logo" className={classes.logoImg} />
          </div>
          <Link to="/minting" className={classes.link + (selectIndex ==5?" active": "")} onClick={() => handleChangeIndex(5)}>
            Minting
          </Link>
          <Link to="/staking" className={classes.link + (selectIndex ==6?" active": "")} onClick={() => handleChangeIndex(6)}>
            Staking
          </Link>
          <Link to="/staking" className={classes.link + (selectIndex ==7?" active": "")} onClick={() => handleChangeIndex(7)}>
            Connect Wallet
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
