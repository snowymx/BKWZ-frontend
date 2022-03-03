import React, {useEffect, useState} from 'react';
import './Staking.scss';
import nft1Image from '../../assets/nft1.png';

const Staking = () => {
  const [nftStaking, setNftStaking] = useState(true);
  const onSwitch = () => {
    if(nftStaking) setNftStaking(false);
    else setNftStaking(true);
  }
  return (
    <section className='container-fluid staking' id='staking'>
      <div className='content'>
        <div className='container'>
          <div className='row switch-button' onClick={onSwitch}>
            <div className={nftStaking? 'nft active' : 'nft'}>NFT Staking</div>
            <div className={nftStaking? 'coin' : 'coin active'}>Coin Staking</div>
          </div>
          {nftStaking?
            <div className='row tran-box'>
              <div className='stake-state'>
                <div className='staked'>STAKED - 7</div>
                <div className='unstaked'>UNSTAKED - 0</div>
              </div>
              <h4 className='your-avatars'>Your Avatars</h4>
              <div className='avatars'>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
                <div className='nft-box'>
                  <h5>Estimated daily yield:</h5>
                  <h5 style={{color: "#FF9600"}}>1.00 BKWZ</h5>
                  <img src={nft1Image} alt="nft" />
                  <h5 style={{marginTop: "10px"}}>Ready to collect:</h5>
                  <h5 style={{color: "#FF9600"}}>7.512350 BKWZ</h5>
                  <div className='nft-button'>CLAIM</div>
                  <div className='nft-button'>UNSTAKE</div>
                </div>
              </div>
              <div className='claim-all'>
                <div className='available-claim'>Available to claim: <h style={{color: "#FF9600"}}> 23.222 BKWZ</h></div>
                <div className='all-claim-button'>CLAIM ALL</div>
              </div>
            </div>
          : null}
          {!nftStaking?
            <div className='row tran-box' style={{padding: "20em 0"}}>
              <h4>Coin Staking</h4>
            </div>
          : null}
          {/* <div className='row tran-box' style={{padding: "10em 0"}}>
            <h4>Demo Game</h4>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Staking;
