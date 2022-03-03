import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import history from "../../Utils/history";
import './header.scss';
import logoImg from '../../../assets/LOGO_MIDDLE.png';

const Header = () => {
  const [path, setPath] = useState("/");

  useEffect(() => {
    history.listen(location => {
      setPath(location.pathname);
    });
  }, []);

  return (
    <section>
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
              <div className='col-12 col-md-4 m-auto link-item' style={{cursor: "pointer"}}>
                {/* <Link to=""> */}
                    Connect Wallet
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className='header-mobile-content row'>
        <div className='row col-12 m-auto p-mobile-auto'>
          <div className='col-lg-12 col-md-12 col-sm-12 m-auto'>
             <img src={logoImg} alt="logo" />
          </div>
          </div>
          <div className='row col-12'>
             <div className='col-lg-6 col-md-6 col-sm-12 m-auto'>
                <a>Gameplay</a>
                <a>DAO</a>
                <a>Beta</a>
                <a>Token</a>  
             </div>
             <div className='col-lg-6 col-md-6 col-sm-12 m-auto p-mobile-auto'>
                <a>Minting</a>
                <a>Staking</a>
                <a>Connect Wallet</a>
             </div>
          </div>
          
        </div>
      </header>
    </section>
  );
};

export default Header;
