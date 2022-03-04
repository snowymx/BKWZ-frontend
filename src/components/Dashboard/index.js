import React, {useState, useEffect} from 'react';
import './Dashboard.scss';
import diceImage from '../../assets/DiceGroup.png';
import signLogo from '../../assets/BWKZ_signlogo.png';
import dice from '../../assets/DICE4.png';
import ped from '../../assets/ped.png';
import sam from '../../assets/Sam.png';

const Dashboard = () => {
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // onTheme("dashboard");
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWidth(window.innerWidth);
      if(window.innerWidth < 1000) setIsMobile(true);
      else setIsMobile(false);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return (
    <section className='container-fluid welcome' id='welcome'>
      <div className='content'>
      <div className='container'>
        <div className='intro'>
          <h1>A BOARD GAME</h1>
          <h1>BUILT ON THE AVALANCHE BLOCKCHAIN.</h1>
          <h2>Play Blockways, earn BKWZ tokens.</h2>
          <p>Whitelist our Avatars NFT’s drop just below. Limited to 1000.</p>
          <p>By staking the NFT, you will earn BKWZ Tokens daily!</p>
          <div className='row'>
            <div className='col-12 col-md-4 col-sm-4'></div>
            <div className=' whitelist-button col-12 col-md-4 col-sm-4'>Whitelist</div>
            <div className='col-12 col-md-4 col-sm-4'></div>
          </div>
          <div className='row dice-group'>
            <img src={diceImage} alt="dice" />
          </div>
        </div>
        </div>
        <div className='mission'>
          <h2>Our <span className='grad-txt'>mission.</span></h2>
          <div className='row px-5'>
            <div className='col-12 col-lg-4'>
              <div className='mission-item'> 
                <h2>Wealthy</h2>
                <p className='line'></p>
                <p>Building wealth should be a thrilling experience!</p> 
                <p>We're bringing our board game to the Blockchain and letting people build their empire whilst having fun!</p>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='mission-item '>
                <h2>Gaming</h2>
                <p className='line'></p>
                <p>We LOVE games.</p>
                <br/>
                <p>Our misssion is to bring you easily accesible, easy to pick up - hard to master games that you remember for a lifetime!</p>
              </div>
            </div>
            <div className='col-12 col-lg-4'>
              <div className='mission-item'>
                <h2>Community</h2>
                <p className='line'></p>
                <p>We want you to feel a part of Blockways.</p>
                <p>We care about our community and want to build healthy and positive relations. and unblock each others way.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='adventure'>
          <h2>How do you begin your <span className='grad-txt'>adventure</span>? </h2>
          <hr className='m-4'></hr>
          <div className='row'>
            <div className='col-md-12 col-lg-2'>
              <img src={signLogo} alt="sign"></img>
            </div>
            <div className='col-md-12 col-lg-8 text-start m-auto'>
              <h2 className='grad-txt'>Buy $BKWZ.</h2>
              <h4>The currency of Blockways</h4>
              <p>BKWZ Token is the in-game currency and your “entry ticket” to the game.<br/> Buy it from the market or buy it at a discount on the dApp against listed tokens</p>
            </div>
            <div className='col-md-12 col-lg-2'>
            </div>
          </div>
          {isMobile?
            <div className='row'>
              <div className='col-md-12 col-lg-2'>
                <img src={dice} alt="dice"></img>
              </div>
              <div className='col-md-12 col-lg-8 text-start m-auto'>
                <h2 className='grad-txt'>Mint Avatars.</h2>
                <h4>Our avatars combine everything that is beautiful about NFT’s.</h4>
                <p>Each BKWZ Avatar will provide yield on daily basis. You can claim the <br/>rewards at any time or trade your unique BKWZ Avatar on the marketplace.</p>
              </div>
              <div className='col-md-12 col-lg-2'>
              </div>
            </div>
            :
            <div className='row'>
              <div className='col-md-12 col-lg-2'>
              </div>
              <div className='col-md-12 col-lg-8 text-end m-auto'>
                <h2 className='grad-txt'>Mint Avatars.</h2>
                <h4>Our avatars combine everything that is beautiful about NFT’s.</h4>
                <p>Each BKWZ Avatar will provide yield on daily basis. You can claim the <br/>rewards at any time or trade your unique BKWZ Avatar on the marketplace.</p>
              </div>
              <div className='col-md-12 col-lg-2'>
                <img src={dice} alt="dice"></img>
              </div>
            </div>
          }
          <div className='row'>
            <div className='col-md-12 col-lg-2'>
              <img src={ped} alt="ped"></img>
            </div>
            <div className='col-md-12 col-lg-8 text-start m-auto'>
              <h2 className='grad-txt'>Play & Earn.</h2>
              <h4>Earning whilst genuinely having fun!</h4>
              <p>Use your imagination, come up with the best strategy and become the best at <br/> blocking your opponents way! </p>
            </div>
            <div className='dol-md-12 col-lg-2'>
            </div>
          </div>
        </div>
        <div className='team'>
          <h2>Meet our <span className='grad-txt'>team</span>.</h2>
          <div className='row px-5'>
            <div className='team-item col-sm-12 col-md-6 col-lg-3'>
              <img src={sam} alt="sam"></img>
              <h4>Sam</h4>
              <p>Project Director</p>
            </div>
            <div className='team-item col-sm-12 col-md-6 col-lg-3'>
              <img src={sam} alt="sam"></img>
              <h4>Greg</h4>
              <p>Designer</p>
            </div>
            <div className='team-item col-sm-12 col-md-6 col-lg-3'>
              <img src={sam} alt="sam"></img>
              <h4>Mike</h4>
              <p>Game Dev</p>
            </div>
            <div className='team-item col-sm-12 col-md-6 col-lg-3'>
              <img src={sam} alt="sam"></img>
              <h4>Matt</h4>
              <p>Blockchain Dev</p>
            </div>
          </div>
        </div>
        <div className='roadmap'>
          <h2>Look at us <span className='grad-txt'>evolve</span>.</h2>
          <div className='row px-5'>
            <div className='roadmap-item col-sm-12 col-md-6 col-lg-3'>
              <div>PHASE 1  -  Q1</div>
              <h4>Website Launch</h4>
              <h4>NFT Presale</h4>
              <h4>NFT Public Sale</h4>
              <h4>NFT Staking</h4>
              <h4>Closed Game Beta</h4>
            </div>
            <div className='roadmap-item col-sm-12 col-md-6 col-lg-3'>
              <div>PHASE 2  -  Q2</div>
              <h4>Open Game Beta</h4>
              <h4>Token Release </h4>
              <h4>Token Staking</h4>
              <h4>Public Game Release</h4>
            </div>
            <div className='roadmap-item col-sm-12 col-md-6 col-lg-3'>
              <div>PHASE 3  -  Q3</div>
              <h4>Leaderboards</h4>
              <h4>Daily Tasks </h4>
              <h4>New Game Modes</h4>
              <h4>In-Game NFT’s</h4>
            </div>
            <div className='roadmap-item col-sm-12 col-md-6 col-lg-3'>
              <div>PHASE 4  -  Q4</div>
              <h4>To be announced</h4>
            </div>
          </div>
        </div>
        <div>
          <div className='buy' style={{padding: "2em"}}>
            <h2>Buy <span className='grad-txt'>$BKWZ</span>.</h2>
            <div>Buy on TraderJoe</div>
            <p>Comming soon!</p>
          </div>
        </div>
        <div className='address'>
          <div className='row'>
            <div className='col-lg-1'>
              <img src={signLogo} alt="logo" />
            </div>
            <div className='col-lg-11'>
              <p>Token Contract address: <span className='small-font'>0xab5231d197AC42123d346f4EB70C703F308D1E0x234</span> </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-1'>
                <img src={dice} alt="logo" />
              </div>
              <div className='col-lg-11'>
                <p>Avatar Contract address: <span className='small-font'>0x8927985B358692815E18F2138964679DcA231fds5ds3</span></p>
              </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Dashboard;
