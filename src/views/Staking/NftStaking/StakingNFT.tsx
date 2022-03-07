import "../Staking.scss";
import { nft1 } from "../../../constants/img";
import classNames from "classnames";

function StakingNFT() {
    return (
        <>
            <div><h4 className="your-avatars">Your Staked Avatars</h4></div>
            <div className="avatars">
                <div className="nft-box">
                    <h5 className="gray">Estimated daily yield:</h5>
                    <h5 className="yellow-bold">1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 className="gray">Rarity:</h5>
                    <h5 className="rarity-common"></h5>
                    <hr style={{width: "70%"}} />
                    <h5  className="gray" style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 className="yellow-bold">7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5 className="gray">Estimated daily yield:</h5>
                    <h5 className="yellow-bold">1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 className="gray">Rarity:</h5>
                    <h5 className="rarity-rare"></h5>
                    <hr style={{width: "70%"}} />
                    <h5  className="gray" style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 className="yellow-bold">7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 className="yellow-bold">1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5>Rarity:</h5>
                    <h5 className="rarity-unique"></h5>
                    <hr style={{width: "70%"}} />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 className="yellow-bold">7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 className="yellow-bold">1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5>Rarity:</h5>
                    <h5 className="rarity-legendary"></h5>
                    <hr style={{width: "70%"}} />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 className="yellow-bold">7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
            </div>
            <div className="claim-all">
                <div className="available-claim">
                    Available to claim: <span className="yellow-bold"> 23.222 BKWZ</span>
                </div>
                <div className="all-claim-button">CLAIM ALL</div>
            </div>
        </>
    )
}

export default StakingNFT;