import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import history from "../../Utils/history";
import './header.scss';
import logoImg from '../../../assets/logo.png';
import listImg from '../../../assets/menu.svg';
import closeImg from '../../../assets/close.svg';

const Header = () => {
  const [path, setPath] = useState("/");
  const [menuStyle, setMenuStyle] = useState({width: "", height: "", top: ""});
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    history.listen(location => {
      setPath(location.pathname);
    });
  }, []);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      if(window.innerWidth > 1000) setIsMobile(true);
      else setIsMobile(false);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setMenuStyle({width: window.innerWidth, height: window.innerHeight, top: currentScrollY});
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onMenu = () => {
    setShowMenu(true);
    setMenuStyle({width: window.innerWidth, height: window.innerHeight, top: "0"});
  }

  const offMenu = () => {
    console.log(showMenu);
    setShowMenu(false);
  }

  return (
    <section>
      {isMobile?
        <header className='container-fluid header'>
          <div className='header-content row'>
            <div className='col-12 col-md-5 m-auto'>
              <div className='row'>
                <div className={path === "/gameplay" ? 'col-12 col-md-3 m-auto link-item-active' : 'col-12 col-md-3 m-auto link-item'}>
                  <Link to="/gameplay">
                      Gameplay
                  </Link>
                </div>
                <div className={path === "/dao" ? 'col-12 col-md-3 m-auto link-item-active' : 'col-12 col-md-3 m-auto link-item'}>
                  <Link to="/dao">
                      DAO
                  </Link>
                </div>
                <div className={path === "/beta" ? 'col-12 col-md-3 m-auto link-item-active' : 'col-12 col-md-3 m-auto link-item'}>
                  <Link to="/beta">
                      Beta
                  </Link>
                </div>
                <div className={path === "/token" ? 'col-12 col-md-3 m-auto link-item-active' : 'col-12 col-md-3 m-auto link-item'}>
                  <Link to="/token">
                      Token
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-2 m-auto'>
              <div className='img-link-item'>
              <Link to="/">
                <img src={logoImg} alt="logo" />
              </Link>
              </div>
              
              {/* <img src={logoImg} alt="logo" /> */}
            </div>
            <div className='col-12 col-md-5 m-auto'>
              <div className='row'>
                <div className='col-12 col-md-1 m-auto'></div>
                <div className={path === "/minting" ? 'col-12 col-md-3 m-auto link-item-active' : 'col-12 col-md-3 m-auto link-item'}>
                  <Link to="/minting">
                      Minting
                  </Link>
                </div>
                <div className={path === "/staking" ? 'col-12 col-md-4 m-auto link-item-active' : 'col-12 col-md-4 m-auto link-item'}>
                  <Link to="/staking">
                      Staking
                  </Link>
                </div>
                <div className='col-12 col-md-4 m-auto link-item' style={{cursor: "pointer", padding: 0}}>
                  {/* <Link to=""> */}
                      Connect Wallet
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </header>
      :
        <header className='container-fluid header'>
          <div className='header-content-mobile'>
            <div className='list-button'>
              <img src={listImg} alt="list" onClick={onMenu} />
            </div>
            <div className='connect-button'>Connect</div>
            <div className='img-link-item'>
              <Link to="/">
                <img src={logoImg} alt="logo" />
              </Link>
            </div>
          </div>
          <div className={showMenu?'mobile-menu show':'mobile-menu hide'} style={menuStyle}>
            <div className='close-button'>
              <img src={closeImg} alt="list" onClick={offMenu} />
            </div>
            <div className={path === "/gameplay" ? 'mobile-list active-m' : 'mobile-list'}>
              <Link to="/gameplay" onClick={offMenu}>
                  Gameplay
              </Link>
            </div>
            <div className={path === "/dao" ? 'mobile-list active-m' : 'mobile-list'}>
              <Link to="/dao" onClick={offMenu}>
                  Dao
              </Link>
            </div>
            <div className={path === "/beta" ? 'mobile-list active-m' : 'mobile-list'}>
              <Link to="/beta" onClick={offMenu}>
                  Beta
              </Link>
            </div>
            <div className={path === "/token" ? 'mobile-list active-m' : 'mobile-list'}>
              <Link to="/token" onClick={offMenu}>
                  Token
              </Link>
            </div>
            <div className={path === "/minting" ? 'mobile-list active-m' : 'mobile-list'}>
              <Link to="/minting" onClick={offMenu}>
                  Minting
              </Link>
            </div>
            <div className={path === "/staking" ? 'mobile-list active-m' : 'mobile-list'}>
              <Link to="/staking" onClick={offMenu}>
                  Staking
              </Link>
            </div>
          </div>
        </header>
      }
    </section>
  );
};

export default Header;
