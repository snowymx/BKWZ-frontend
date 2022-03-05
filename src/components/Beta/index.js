import React from 'react';
import Backgorund from '../Background';
import './Beta.scss';

const Dao = () => {
  return (
    <section className='container-fluid beta' id='beta'>
      <Backgorund imageName="minting-back" />
      <div className='content'>
        <div className='container'>
          <div className="gameplay-box" style={{padding: "10em 0"}}>
            <span>COMING SOON</span>
          </div>
          <div className="gameplay-box" style={{padding: "10em 0"}}>
            <span>DEMO GAME</span>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Dao;
