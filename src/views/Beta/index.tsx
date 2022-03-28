import { useSelector } from "react-redux";
import { Zoom } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Beta.scss";
import { useWeb3Context } from "../../hooks";
import { IReduxState } from "../../store/slices/state.interface";

function Beta() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const avatarBalance = useSelector<IReduxState, number>(state => {
        return state.account.balances.avatarBalance;
    });

    const accountLoading = useSelector<IReduxState, boolean>(state => {
        return state.account.loading;
    });

    if(accountLoading && address) return (<div className="progress"><CircularProgress size={150} color="inherit" style={{margin: "16em auto"}} /></div>)
    
    return (
        <section className='container-fluid beta' id='beta'>
            <div className='content'>
                <div className='container'>
                    {!address && 
                    (<Zoom in={true}>
                        <div className="tran-box">
                            <h4>CLOSED BETA PHASE.</h4>
                            <br />
                            <hr />
                            <br />
                            <h5 style={{fontWeight: "lighter"}}>We are currently in the beta phase of the Blockways game - which is only accessible to holders of the <span style={{fontStyle: "italic", fontWeight: "bold"}}>Blockways Avatars</span>. You will need to own at least one avatar to be able to participate at this stage. </h5>
                            <br />
                            <h5>Please connect your wallet to continue.</h5>
                            <br />
                            <div className="connect-button" onClick={connect}>CONNECT WALLET</div>
                        </div>
                    </Zoom>)}
                    {address && !avatarBalance && 
                    (<Zoom in={true}>
                        <div className="tran-box">
                            <h4>CLOSED BETA PHASE.</h4>
                            <br />
                            <hr />
                            <br />
                            <h5 style={{fontWeight: "lighter"}}>Unfortunately, we weren’t able to find any <span style={{fontStyle: "italic", fontWeight: "bold"}}>Blockways Avatars</span> in your wallet. Head to the mint page and get yourself an Avatar to access Blockways BETA!</h5>
                            <br />
                            <h5 style={{fontWeight: "lighter", fontSize: "1.1em"}}>*Please note, if you have just completed minting, give it a minute to refresh.</h5>
                            <br />
                        </div>
                    </Zoom>)}
                    {address && avatarBalance && 
                    (<Zoom in={true}>
                        <div className="tran-box">
                            <h4>CLOSED BETA PHASE.</h4>
                            <br />
                            <hr />
                            <br />
                            <h5 style={{fontWeight: "lighter"}}>Thanks for participating in our minting and beta phase! </h5>
                            <br />
                            <h5 style={{fontWeight: "lighter"}}>Follow our socials for more info on the release date - it’s just around the corner!</h5>
                            <br />
                        </div>
                    </Zoom>)}
                </div>
            </div>
        </section>
    );
}

export default Beta;
