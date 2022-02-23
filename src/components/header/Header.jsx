import React from 'react';
import './Header.scss';
import logoImg from '../../assets/LOGO_MIDDLE.png';
import NavigationBar from '../navigation-bar/NavigationBar';

const Header = () => {
  return (
    <section>
      <header className='container-fluid header'>
        <div className='header-content row'>
          <div className='col-12 col-md-4 m-auto'>
            <a>Gameplay</a>
            <a>DAO</a>
            <a>Beta</a>
            <a>Token</a>
          </div>
          <div className='col-12 col-md-4 m-auto'>
            <img src={logoImg} alt="logo" />
          </div>
          <div className='col-12 col-md-4 m-auto'>
            <a>Minting</a>
            <a>Staking</a>
            <a>Connect Wallet</a>
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
