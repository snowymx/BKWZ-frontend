import React from 'react';
import './Header.scss';
import logoImg from '../../assets/LOGO_MIDDLE.png';

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
      </header>
    </section>
  );
};

export default Header;
