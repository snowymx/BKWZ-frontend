import React from 'react';
import './Dao.scss';
import diceImage from '../../assets/daoImage.png';

const Dao = () => {
  return (
    <section className='container-fluid dao' id='dao' style={{padding: "15em 0"}}>
      <div className='content'>
        <div className='container'>
        <div className='intro'>
          <div className='row dice-group'>
            <br />
            <img src={diceImage} alt="dice" />
            <br />
          </div>
        </div>
        </div>
      </div>
    </section>

  );
};

export default Dao;
