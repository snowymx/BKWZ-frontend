import { useState } from "react";
import { Grid, Zoom } from "@material-ui/core";
import AvaxDepositModal from "./modals/AvaxDepositModal";
import "../Staking.scss";
import { avax, signlogo } from "../../../constants/img";

function CoinStaking() {
    const [staking, setStaking] = useState(true);
    const onSwitch = () => {
        setStaking(!staking);
    };
    return (
        <Zoom in={true}>
            <div className="coin-staking-box">
                <div className="coin-box">
                    <h4>AVAX POOL</h4>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <img src={avax} alt='' style={{width: "80%", margin: "10%"}}></img>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <h5>BKWZ Earned</h5>
                    <h5 className="number">0.000000000</h5>
                    <div className="earning-button">Claim earnings</div>
                    <div className="coin-button">Deposit</div>
                    <div className="coin-button">Unstake</div>
                    <h5 className="short">APY % :</h5>
                    <h5 className="short-number">55.4235 %</h5>
                    <h5 className="short" style={{marginTop: "18px"}}>Your Stake</h5>
                    <h5 className="short-number">0.000000</h5>
                    <hr />
                    <h5 className="short" style={{marginTop: "18px"}}>Total staked (by community):</h5>
                    <h5 className="short-number">124.12513</h5>
                    <h5 className="short" style={{marginTop: "18px"}}>Ends in (blocks):</h5>
                    <h5 className="short-number">245,342</h5>
                    <hr />
                    <h5 className="short" style={{margin: "18px auto", width: "80%"}}>*10% of BKWZ staked will be burned upon unstaking.</h5>
                    <h5 className="yellow-bold">View contact page</h5>
                </div>
                <div className="coin-box">
                    <h4>BKWZ / WAVAX LP Pool</h4>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                          <img src={signlogo} alt=''></img>
                        </Grid>
                        <Grid item xs={4}>
                          <img src={avax} alt='' style={{width: "80%", margin: "10%"}}></img>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    <h5>BKWZ Earned</h5>
                    <h5 className="number">0.000000000</h5>
                    <div className="earning-button">Claim earnings</div>
                    <div className="coin-button">Deposit</div>
                    <div className="coin-button">Unstake</div>
                    <h5 className="short">APY % :</h5>
                    <h5 className="short-number">55.4235 %</h5>
                    <h5 className="short" style={{marginTop: "18px"}}>Your Stake</h5>
                    <h5 className="short-number">0.000000</h5>
                    <hr />
                    <h5 className="short" style={{marginTop: "18px"}}>Total staked (by community):</h5>
                    <h5 className="short-number">124.12513</h5>
                    <h5 className="short" style={{marginTop: "18px"}}>Ends in (blocks):</h5>
                    <h5 className="short-number">245,342</h5>
                    <hr />
                    <h5 className="short" style={{margin: "18px auto", width: "80%"}}>*10% of BKWZ staked will be burned upon unstaking.</h5>
                    <h5 className="yellow-bold">View contact page</h5>
                </div>
                <div className="coin-box">
                    <h4>BKWZ Pool</h4>
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                          <img src={signlogo} alt=''></img>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                    <h5>BKWZ Earned</h5>
                    <h5 className="number">0.000000000</h5>
                    <div className="earning-button">Claim earnings</div>
                    <div className="coin-button">Deposit</div>
                    <div className="coin-button">Unstake</div>
                    <h5 className="short">APY % :</h5>
                    <h5 className="short-number">55.4235 %</h5>
                    <h5 className="short" style={{marginTop: "18px"}}>Your Stake</h5>
                    <h5 className="short-number">0.000000</h5>
                    <hr />
                    <h5 className="short" style={{marginTop: "18px"}}>Total staked (by community):</h5>
                    <h5 className="short-number">124.12513</h5>
                    <h5 className="short" style={{marginTop: "18px"}}>Ends in (blocks):</h5>
                    <h5 className="short-number">245,342</h5>
                    <hr />
                    <h5 className="short" style={{margin: "18px auto", width: "80%"}}>*10% of BKWZ staked will be burned upon unstaking.</h5>
                    <h5 className="yellow-bold">View contact page</h5>
                </div>
            </div>
        </Zoom>

    );
}

export default CoinStaking;
