import "../Staking.scss";
import { nft1 } from "../../../constants/img";
import classNames from "classnames";

function StakingNFT() {
    return (
        <>
            <div><h4 className="your-avatars">Your Staked Avatars</h4></div>
            <div className="avatars">
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
                <div className="nft-box">
                    <h5>Estimated daily yield:</h5>
                    <h5 style={{ color: "#FF9600" }}>1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5 style={{ marginTop: "10px" }}>Ready to collect:</h5>
                    <h5 style={{ color: "#FF9600" }}>7.512350 BKWZ</h5>
                    <div className="nft-button">CLAIM</div>
                    <div className="nft-button">UNSTAKE</div>
                </div>
            </div>
            <div className="claim-all">
                <div className="available-claim">
                    Available to claim: <span style={{ color: "#FF9600" }}> 23.222 BKWZ</span>
                </div>
                <div className="all-claim-button">CLAIM ALL</div>
            </div>
        </>
    )
}

export default StakingNFT;