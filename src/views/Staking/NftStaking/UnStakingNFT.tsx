import "../Staking.scss";
import { nft1 } from "../../../constants/img";
import classNames from "classnames";

function UnStakingNFT() {
    return (
        <>
            <div><h4 className="your-avatars">Your Unstaked Avatars</h4></div>
            <div className="avatars">
                <div className="nft-box">
                    <h5>Potential daily yield:</h5>
                    <h5 className="yellow-bold">1.00 BKWZ</h5>
                    <img src={nft1} alt="nft" />
                    <h5>Rarity:</h5>
                    <h5 className="rarity-common"></h5>
                    <hr style={{width: "70%"}} />
                    <h5 style={{ marginTop: "10px" }}>Stake your avatar to earn BKWZ</h5>
                    <div className="nft-button">STAKE</div>
                </div>
            </div>
            <div className="stake-all">
                <div className="stake-all-button">Stake All</div>
            </div>
        </>
    )
}

export default UnStakingNFT;