import React, {useState} from 'react';
import { Grid, Zoom } from "@material-ui/core";
import '../Staking.scss';

function CoinStaking() {
  const [staking, setStaking] = useState(true);
  const onSwitch = () => {
    setStaking(!staking);
  }
  return (
        <Zoom in={true}>
            <div className='row tran-box' style={{padding: "20em 0"}}>
                <h4>Coin Staking</h4>
            </div>
        </Zoom>
  );
};

export default CoinStaking;
