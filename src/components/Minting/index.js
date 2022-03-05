import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../store/slices/counter-slice';
import Backgorund from '../Background';
import './Minting.scss';
import dice from '../../assets/DICE4.png';
import plusImage from '../../assets/plus.png';
import minusImage from '../../assets/minus.png';

const Minting = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [value, setValue] = useState(1);
  const addValue = () => {
    setValue(value + 1);
    dispatch(increment());
  }
  const subValue = () => {
    if(value === 1) return;
    setValue(value - 1);
    dispatch(decrement());
  }

  return (
    <section className='container-fluid minting' id='minting'>
      <Backgorund imageName="minting-back" />
      <div className='content'>
        <div className='container'>
          <div className='row tran-box'>
            <h2>
              Start <span className="grad-txt">Minting</span>.
            </h2>
            <div className='col-12 col-md-4 m-auto'>
              <div className='mint-box'>
                <h5 style={{padding: "0 1em"}}>Be the first to mint one our limited 1000 BKWZ Avatars.</h5>
                <br />
                <h5>Those are going to be displayed in the game as your avatars and by owning one of those, you will be able to stake and earn daily BKWZ Tokens at a stable rate.</h5>
                <br />
                <h5>Rarity chances are listed just below:</h5>
                <br />
                <h5 style={{opacity: "0.6"}}>80% chance - Common</h5>
                <h5 style={{opacity: "0.6"}}>10% chance - <span style={{color: "#FF0707", fontWeight: "600"}}>Rare</span></h5>
                <h5 style={{opacity: "0.6"}}>7% chance - <span style={{color: "#FF9600", fontWeight: "600"}}>Unique</span></h5>
                <h5 style={{opacity: "0.6"}}>3% chance - <span style={{color: "#F901FF", fontWeight: "600"}}>Legendary</span></h5>
              </div>
            </div>
            <div className='col-12 col-md-4 m-auto'>
              <div className='mint-box'>
                <img src={dice} alt="dice" />
                <div className='bar'></div>
                <h5 style={{opacity: "0.6"}}>Chance for a common: 80%</h5>
              </div>
              <div className='mint-box'>
                <h4>Minted - 0 / 1000</h4>
              </div>
            </div>
            <div className='col-12 col-md-4 m-auto' style={{padding: "20px 12px"}}>
              <div className='mint-box'>
                <h4>Start Minting</h4>
                <div className='bar'></div>
                <div className='row'>
                  <div className='col-number'></div>
                  <div className='col-number'>
                    <img src={minusImage} alt="minus" onClick={subValue} />
                  </div>
                  <div className='col-number'>
                    <h4>{count}</h4>
                  </div>
                  <div className='col-number'>
                    <img src={plusImage} alt="plus" onClick={addValue} />
                  </div>
                  <div className='col-number'></div>
                </div>
                <div className='bar'></div>
                <h4>Cost {value/2} AVAX</h4>
                <br />
                <div className='connect-button'>CONNECT WALLET</div>
              </div>
            </div>
          </div>
          <div className='row tran-box' style={{padding: "10em 0"}}>
            <h4>Demo Game</h4>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Minting;
