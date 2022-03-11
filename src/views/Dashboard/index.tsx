import { NavLink } from "react-router-dom";
import { Grid, Zoom, useMediaQuery, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import "./Dashboard.scss";
import {dice, diceGroup, signlogo, ped} from "../../constants/img"
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
    textStart: {
        textAlign: "left",
    },
    textEnd: {
        textAlign: "right",
    },
}));

function Dashboard() {
    const classes = useStyles();
    const isSmallerScreen = useMediaQuery("(max-width: 960px)");

    return (
        <section className="container-fluid welcome" id="welcome">
            <div className="content">
                <Zoom in={true}>
                    <div className="container">
                        <div className="intro">
                            <h1>A BOARD GAME</h1>
                            <h1>BUILT ON THE AVALANCHE BLOCKCHAIN.</h1>
                            <h2>Play Blockways, earn BKWZ tokens.</h2>
                            <p>Whitelist our Avatars NFT’s drop just below. Limited to 1000.</p>
                            <p>By staking the NFT, you will earn BKWZ Tokens daily!</p>
                            <div className="whitelist-button">Whitelist</div>
                            <div className="row dice-group">
                                <img src={diceGroup} alt="dice" />
                            </div>
                        </div>
                    </div>
                </Zoom>
                <Zoom in={true}>
                    <div className="mission">
                        <h2>
                            Our <span className="grad-txt">mission.</span>
                        </h2>
                        <Grid container>
                            <Grid item lg={4}>
                                <div className="mission-item">
                                    <h2>Wealthy</h2>
                                    <p className="line"></p>
                                    <p>Building wealth should be a thrilling experience!</p>
                                    <p>We're bringing our board game to the Blockchain and letting people build their empire whilst having fun!</p>
                                </div>
                            </Grid>                        
                            <Grid item lg={4}>
                                <div className="mission-item ">
                                    <h2>Gaming</h2>
                                    <p className="line"></p>
                                    <p>We LOVE games.</p>
                                    <br />
                                    <p>Our misssion is to bring you easily accesible, easy to pick up - hard to master games that you remember for a lifetime!</p>
                                </div>
                            </Grid>                        
                            <Grid item lg={4}>
                                <div className="mission-item">
                                    <h2>Community</h2>
                                    <p className="line"></p>
                                    <p>We want you to feel a part of Blockways.</p>
                                    <p>We care about our community and want to build healthy and positive relations. and unblock each others way.</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Zoom>
                <Zoom in={true}>
                    <div className="adventure">
                        <h2 style={{marginBottom: "1em"}}>
                            How do you begin your <span className="grad-txt">adventure</span>?{" "}
                        </h2>
                        <hr className="m-4" style={{width: "60%"}}></hr>
                        <Grid container>
                            <Grid item sm={12} md={3} lg={2} container>
                                <Grid item sm={3} xs={2} container></Grid>
                                <Grid item md={12} sm={6}  xs={8} container>
                                    <img src={signlogo} alt="sign" style={{width: "100%"}}></img>
                                </Grid>
                                <Grid item xs={2} sm={3} container></Grid>
                            </Grid>
                            <Grid item sm={12} md={7} lg={5} className={classes.textStart}>
                                <h2><span className="grad-txt">Buy $BKWZ.</span></h2>
                                <h4>The currency of Blockways</h4>
                                <p>
                                    BKWZ Token is the in-game currency and your “entry ticket” to the game.
                                    Buy it from the market or buy it at a discount on the dApp against listed tokens
                                </p>
                            </Grid>
                        </Grid>
                        <br />
                        {isSmallerScreen?
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={3} lg={2} container>
                                <Grid item sm={3} xs={2} container></Grid>
                                <Grid item md={12} sm={6}  xs={8} container>
                                    <img src={dice} alt="dice" style={{width: "80%", margin: "auto"}}></img>
                                </Grid>
                                <Grid item xs={2} sm={3} container></Grid>
                            </Grid>
                            <Grid item sm={12} md={7} lg={5} className={classes.textStart}>
                                <h2><span className="grad-txt">Mint Avatars.</span></h2>
                                <h4>Our avatars combine everything that is beautiful about NFT’s.</h4>
                                <p>
                                Each BKWZ Avatar will provide yield on daily basis. You can claim the rewards at any time or trade your unique BKWZ Avatar on the marketplace.
                                </p>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={3}>
                            <Grid item md={2} lg={4}></Grid>
                            <Grid item sm={12} md={7} lg={6} className={classes.textEnd}>
                                <h2><span className="grad-txt">Mint Avatars.</span></h2>
                                <h4>Our avatars combine everything that is beautiful about NFT’s.</h4>
                                <p>
                                Each BKWZ Avatar will provide yield on daily basis. You can claim the rewards at any time or trade your unique BKWZ Avatar on the marketplace.
                                </p>
                            </Grid>
                            <Grid item sm={12} md={3} lg={2} container>
                                <Grid item sm={3} xs={2} container></Grid>
                                <Grid item md={12} sm={6}  xs={8} container>
                                    <img src={dice} alt="dice" style={{width: "80%", margin: "auto"}}></img>
                                </Grid>
                                <Grid item xs={2} sm={3} container></Grid>
                            </Grid>
                        </Grid>
                        }
                        <br />
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={3} lg={2} container>
                                <Grid item sm={3} xs={2} container></Grid>
                                <Grid item md={12} sm={6}  xs={8} container>
                                    <img src={ped} alt="ped" style={{width: "80%", margin: "auto"}}></img>
                                </Grid>
                                <Grid item xs={2} sm={3} container></Grid>
                            </Grid>
                            <Grid item sm={12} md={7} lg={5} className={classes.textStart}>
                                <h2><span className="grad-txt">Play & Earn.</span></h2>
                                <h4>Earning whilst genuinely having fun!</h4>
                                <p>
                                Use your imagination, come up with the best strategy and become the best at blocking your opponents way! 
                                </p>
                            </Grid>
                        </Grid>
                    </div>
                </Zoom>
                <Zoom in={true}>
                    <div className="team">
                        <h2>
                            Meet our <span className="grad-txt">team</span>.
                        </h2>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={3} className="team-item">
                                <img src={dice} alt="sam"></img>
                                <h4>Sam</h4>
                                <p>Project Director</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} className="team-item">
                                <img src={dice} alt="sam"></img>
                                <h4>Greg</h4>
                                <p>Designer</p>
                            </Grid>                        
                            <Grid item xs={12} sm={6} md={3} className="team-item">
                                <img src={dice} alt="sam"></img>
                                <h4>Mike</h4>
                                <p>Game Dev</p>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} className="team-item">
                                <img src={dice} alt="sam"></img>
                                <h4>Matt</h4>
                                <p>Blockchain Dev</p>
                            </Grid>
                        </Grid>
                    </div>
                </Zoom>
                <Zoom in={true}>
                    <div className="roadmap">
                        <h2>
                            Look at us <span className="grad-txt">evolve</span>.
                        </h2>
                        <Grid container>
                            <Grid item xs={12} md={6} lg={3} className="roadmap-item">
                                <div>PHASE 1 - Q1</div>
                                <h4>Website Launch</h4>
                                <h4>NFT Presale</h4>
                                <h4>NFT Public Sale</h4>
                                <h4>NFT Staking</h4>
                                <h4>Closed Game Beta</h4>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3} className="roadmap-item">
                                <div>PHASE 2 - Q2</div>
                                <h4>Open Game Beta</h4>
                                <h4>Token Release </h4>
                                <h4>Token Staking</h4>
                                <h4>Public Game Release</h4>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3} className="roadmap-item">
                                <div>PHASE 3 - Q3</div>
                                <h4>Leaderboards</h4>
                                <h4>Daily Tasks </h4>
                                <h4>New Game Modes</h4>
                                <h4>In-Game NFT’s</h4>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3} className="roadmap-item">
                                <div>PHASE 4 - Q4</div>
                                <h4>To be announced</h4>
                            </Grid>
                        </Grid>
                    </div>
                </Zoom>
                <Zoom in={true}>
                    <div>
                        <div className="buy" style={{ padding: "2em" }}>
                            <h2>
                                Buy <span className="grad-txt">$BKWZ</span>.
                            </h2>
                            <Link href="https://traderjoexyz.com/home" target="_blank">
                                <div className="buy-button">Buy on TraderJoe</div>
                            </Link>
                            <p>Comming soon...</p>
                        </div>
                    </div>
                </Zoom>
                <Zoom in={true}>
                    <div className="address">
                        <div className="row">
                            <span><img src={dice} alt="logo" style={{transform: "scale(0.9)"}} /><p>Token Contract address: 0xab5231d197AC42123d346f4EB70C703F308D1E0x234</p></span>
                        </div>
                        <br />
                        <div className="row">
                            <span><img src={signlogo} alt="logo" /><p>Avatar Contract address: 0x8927985B358692815E18F2138964679DcA231fds5ds3</p></span>
                        </div>
                    </div>
                </Zoom>
            </div>
        </section>
    );
}

export default Dashboard;
