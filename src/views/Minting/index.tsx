import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
import { useWeb3Context } from "../../hooks";
import { INft } from "src/store/slices/nfts-slice";
import { IReduxState } from "../../store/slices/state.interface";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { setMintModal } from "src/store/slices/modals-slice";
import { changeMint } from "../../store/slices/mint-thunk";
import { clearNfts, fetchNftDetails } from "src/store/slices/nfts-slice";
import "./Minting.scss";
import { raredice, plus, minus } from "../../constants/img";

interface PropsInterface {
    setStakedNftCount: (count:number) => void;
}
  
interface INftItemProps {
    nftItem: INft;
}

function NftBox({nftItem}: INftItemProps) {
    const dispatch = useDispatch();    

    const baseUri = useSelector<IReduxState, string>(state => {
        return state.app.baseUri;
    });

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    let rarityName;
    let nftImage;

    const loadMetadata = async (uri: string): Promise<any> => {
        const data = await axios.get(uri);
        return data;
    };

    const onloadMetadata = (nftDetail: any) => {
        rarityName = "rarity-" + nftDetail.rarity;
        nftImage = nftDetail.image;
        dispatch(fetchNftDetails({
            id: nftItem.id,
            avatarId: nftItem.avatarId,
            staked: nftItem.staked,
            rarity: rarityName,
            image: nftImage,
        }));
    }
    
    useEffect(() => {
        if(baseUri) loadMetadata(baseUri + nftItem.avatarId + ".json").then((data) => onloadMetadata(data.data));        
    }, []);

    // useEffect(() => {
    //     console.log("image load", imageLoaded);
    //     console.log("image error", imageError);
    // }, [imageLoaded, imageError]);

    return(
        <div className="nft-box">
            <h5>Blockways Avatar</h5>
            <h5 style={{letterSpacing: "2px"}}>#{nftItem.avatarId}</h5>
            <div className="nft-image">
                <img src={nftItem.image} style={{display: imageLoaded?'block':"none"}} alt="nft" onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />                
                {!imageLoaded && imageError && <Skeleton className="style-skeleton" variant="rect" height={160} width={160} style={{borderRadius: "20px"}} />}
                {!imageLoaded && !imageError && <Skeleton className="style-skeleton" variant="rect" height={160} width={160} style={{borderRadius: "20px"}} />}
                {/* {!imageLoaded && !imageError && <div className="error-image">Failed</div>}                 */}
            </div>
            <h5>Rarity:</h5>
            {nftItem.rarity?
                <h5 className={nftItem.rarity}></h5>
            :
                <Skeleton className="style-skeleton" height={22} width={"35%"} />
            }
        </div>
    )
}

function Minting() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const totalSupply = useSelector<IReduxState, number>(state => {
        return state.app.totalSupply;
    });

    const avatarPrice = useSelector<IReduxState, number>(state => {
        return state.app.avatarPrice;
    });

    const appLoading = useSelector<IReduxState, boolean>(state => {
        return state.app.loading;
    });

    const accountLoading = useSelector<IReduxState, boolean>(state => {
        return state.account.loading;
    });  
    
    const avatarBalance = useSelector<IReduxState, number>(state => {
        return state.account.balances.avatarBalance;
    });

    const open = useSelector<IReduxState, boolean>(state => {
        return state.modals.mint;
    });  

    const justMint = useSelector<IReduxState, number>(state => {
        return state.modals.justMint;
    }); 

    let nfts = useSelector<IReduxState, INft[]>(state => {
        return state.nfts;
    });

    const [value, setValue] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);

    const addValue = () => {
        setValue(value + 1);
    };

    const subValue = () => {
        if (value === 1) return;
        setValue(value - 1);
    };

    const handleOpen = () => {
        dispatch(setMintModal(true));
    };

    const handleClose = () => {
        dispatch(setMintModal(false));
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        // await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const onMint = async () => {
        if (await checkWrongNetwork()) return;
        await dispatch(changeMint({ address, amount: String(value), avax: String(value * avatarPrice), provider, networkID: chainID }));
    };  

    return (
        <section className="container-fluid minting" id="minting">
            <div className="content">
                <div className="container">
                    {appLoading?
                        <div className="content-progress">
                            <CircularProgress size={150} color="inherit" style={{margin: "16em auto"}} />
                        </div>
                    :
                        <Zoom in={true}>
                            <div className="tran-box">
                                <h2>
                                    WHITELIST <span className="grad-txt">MINTING</span>.
                                </h2>
                                <Grid container>
                                    <Grid item xs={12} md={12} lg={4} className="m-auto">
                                        <div className="mint-box">
                                            <h5 style={{ padding: "0 1em" }}>Be the first to mint one our limited 1000 BKWZ Avatars.</h5>
                                            <h5 style={{marginTop: "22px"}}>
                                                By owning one of those Avatars, you will be able to stake them and earn daily BKWZ tokens at a stable rate for a LONG time. Your fancy Avatar will also be displayed in-game to make your opponents jealous!
                                            </h5>
                                            <h5 style={{marginTop: "22px"}}>Minting rarity chances are listed just below:</h5>
                                            <h5 style={{ opacity: "0.9", fontWeight: "lighter", marginTop: "22px" }}>
                                                55% chance - <span className="rarity-common" />
                                            </h5>
                                            <h5 style={{ opacity: "0.9", fontWeight: "lighter" }}>
                                                25% chance - <span className="rarity-rare" />
                                            </h5>
                                            <h5 style={{ opacity: "0.9", fontWeight: "lighter" }}>
                                                10% chance - <span className="rarity-epic" />
                                            </h5>
                                            <h5 style={{ opacity: "0.9", fontWeight: "lighter" }}>
                                                6% chance - <span className="rarity-unique" />
                                            </h5>
                                            <h5 style={{ opacity: "0.9", fontWeight: "lighter" }}>
                                                4% chance - <span className="rarity-legendary" />
                                            </h5>
                                            <h5 style={{marginTop: "15px"}}>WL Price: 0.75 AVAX</h5>
                                            <h5 onClick={handleOpen}>Public Price: 1.00 AVAX</h5>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} className="m-auto">
                                        <div className="mint-box">
                                            <img className="diceImage" src={raredice} style={{display: imageLoaded?'initial':"none"}} alt="dice" onLoad={() => setImageLoaded(true)} />
                                            {!imageLoaded && <Skeleton className="style-skeleton" variant="rect" height={263} width={263} style={{borderRadius: "20px", marginTop: "20px"}} />}
                                            <div className="bar"></div>
                                            <h5 style={{ opacity: "0.9" }}>Chance for <span style={{ color: "#FF0707" }}>Rare </span>: 25%</h5>
                                        </div>
                                        <div className="mint-box">
                                            {!appLoading ? <h4>Minted - {+totalSupply} / 1000</h4> : <Skeleton className="style-skeleton" height={50} width={"80%"} />}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} className="m-auto">
                                        <div className="mint-box">
                                            <h4>Start Minting</h4>
                                            <div className="mint-value-set">
                                                <Grid container>
                                                    <Grid item xs={3}></Grid>
                                                    <Grid item xs={2}>
                                                        <img src={minus} alt="minus" onClick={subValue} />
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <h4>{value}</h4>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <img src={plus} alt="plus" onClick={addValue} />
                                                    </Grid>
                                                    <Grid item xs={3}></Grid>
                                                </Grid>
                                            </div>
                                            {!appLoading? <h4>Cost {value * avatarPrice} AVAX</h4> : <Skeleton className="style-skeleton" height={40} width={"70%"} /> }
                                            <h4 style={{opacity: "0.8", fontWeight: 'lighter', fontSize: "24px"}}>Max - 5 per wallet</h4>
                                            <br />
                                            {!address && (
                                                <div className="connect-button" onClick={connect}>
                                                    CONNECT WALLET
                                                </div>
                                            )}
                                            {address && appLoading && (
                                                <div className="connect-button">
                                                    loading...
                                                </div>
                                            )}
                                            {address && !appLoading && (
                                                <div
                                                    className="connect-button"
                                                    onClick={() => {
                                                        if (isPendingTxn(pendingTransactions, "minting")) return;
                                                        onMint();
                                                    }}
                                                >
                                                    {txnButtonText(pendingTransactions, "minting", "Mint")}
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Zoom>
                    }
                    {/* <Zoom in={true}>
                        <div className="row tran-box" style={{ padding: "10em 0" }}>
                            <h4>Demo Game</h4>
                        </div>
                    </Zoom> */}
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className="modal-box">
                    <h2 id="transition-modal-title">The mint is completed!</h2>
                    <hr />
                    <h4>Congratulations. You have received the following avatars:</h4>
                    <div className="avatars">
                    {nfts.length >= justMint ?
                        nfts.map((avatar, index) => {
                            if(index >= nfts.length - justMint) return <NftBox key={avatar.id} nftItem={avatar} />
                        })
                    :
                        accountLoading?
                            <CircularProgress size={130} color="inherit" style={{margin: "10em auto"}} />
                        :
                            <div style={{margin: "10em auto"}}>
                                <h4>You have no Staked Atatars</h4>
                            </div>
                    }
                    </div>
                    <div className="continue-button" onClick={handleClose}>continue</div>
                </div>
                </Fade>
            </Modal>
        </section>
    );
}

export default Minting;
