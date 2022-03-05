import React, {useState} from 'react';
import Backgorund from '../Background';
import NftStaking from './NftStaking';
import CoinStaking from './CoinStaking';
import './Staking.scss';

const Staking = () => {
  const [nftStaking, setNftStaking] = useState(true);
  const onSwitch = () => {
    setNftStaking(!nftStaking);
  }
  return (
    <section className='container-fluid staking' id='staking'>
      <Backgorund imageName="minting-back" />
      <div className='content'>
        <div className='container'>
          <div className='row switch-button' onClick={onSwitch}>
            <div className={nftStaking? 'nft active' : 'nft'}>NFT Staking</div>
            <div className={nftStaking? 'coin' : 'coin active'}>Coin Staking</div>
          </div>
          {nftStaking?
            <NftStaking />
          :
            <CoinStaking />
          }
        </div>
      </div>
    </section>
  );
};

export default Staking;
