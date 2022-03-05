import React from 'react';
import Backgorund from '../Background';
import './Token.scss';
import chartImage from '../../assets/chart.svg';
import traderjoeImage from '../../assets/traderjoe.svg';

const Token = () => {
  return (
    <section className='container-fluid token' id='token'>
      <Backgorund imageName="minting-back" />
      <div className='content'>
        <div className='container'>
        <div className='intro'>
          <div className='row dice-group' style={{padding: "5em 0"}}>
            <img src={chartImage} alt="dice" />
          </div>
          <br />
          <br />
          <div className='row dice-group' style={{padding: "5em 0"}}>
            <img src={traderjoeImage} alt="dice" />
          </div>
        </div>
        </div>
      </div>
    </section>

  );
};

export default Token;
