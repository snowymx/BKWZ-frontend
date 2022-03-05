import React, {useState} from 'react';
import '../Staking.scss';

const CoinStaking = () => {
  const [staking, setStaking] = useState(true);
  const onSwitch = () => {
    setStaking(!staking);
  }
  return (
    <div className='row tran-box' style={{padding: "20em 0"}}>
        <h4>Coin Staking</h4>
    </div>
  );
};

export default CoinStaking;
