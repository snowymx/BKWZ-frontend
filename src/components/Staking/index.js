import React from 'react';
import './Staking.scss';
import diceImage from '../../assets/daoImage.png';

const Staking = () => {
  return (
    <section className='container-fluid welcome' id='welcome'>
      <div className='content'>
        <div className='container'>
        <div className='intro'>
          <div className='row dice-group'>
            <img src={diceImage} alt="dice" />
          </div>
        </div>
        </div>
      </div>
    </section>

  );
};

export default Staking;
