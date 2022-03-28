import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useWeb3Context } from "../../../hooks";
import { IReduxState } from "../../../store/slices/state.interface";
import { INft } from "src/store/slices/nfts-slice";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../../store/slices/pending-txns-slice";
import { fetchNftDetails } from "src/store/slices/nfts-slice";
import "../Staking.scss";

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
            <h5 className="gray">Estimated daily yield:</h5>
            <h5 className="yellow-bold">1.00 BKWZ</h5>
            <div className="nft-image">
                <img src={nftItem.image} style={{display: imageLoaded?'block':"none"}} alt="nft" onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />                
                {!imageLoaded && imageError && <Skeleton className="style-skeleton" variant="rect" height={263} width={263} style={{borderRadius: "20px"}} />}
                {!imageLoaded && !imageError && <Skeleton className="style-skeleton" variant="rect" height={263} width={263} style={{borderRadius: "20px"}} />}
                {/* {!imageLoaded && !imageError && <div className="error-image">Failed</div>}                 */}
            </div>
            <h5 className="gray">Rarity:</h5>
            {nftItem.rarity?
                <h5 className={nftItem.rarity}></h5>
            :
                <Skeleton className="style-skeleton" height={22} width={"35%"} />
            }
            <hr style={{width: "70%"}} />
            <h5  className="gray" style={{ marginTop: "10px" }}>Ready to collect:</h5>
            <h5 className="yellow-bold">7.512350 BKWZ</h5>
            <div className="nft-button">CLAIM</div>
            <div className="nft-button">UNSTAKE</div>
        </div>
    )
}

function SkeletonGroup() {
    return(
        <>            
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <br />
                <Skeleton className="style-skeleton" variant="rect" height={200} width={200} style={{borderRadius: "20px"}} />
                <br />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <br />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <br />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>  
        </>    
    )
}

function StakingNFT(props: PropsInterface) {

    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const accountLoading = useSelector<IReduxState, boolean>(state => {
        return state.account.loading;
    });

    const avatarBalance = useSelector<IReduxState, number>(state => {
        return state.account.balances.avatarBalance;
    });

    const nfts = useSelector<IReduxState, INft[]>(state => {
        let stakedNfts: Array<INft> = [];
        state.nfts.map(nft => {
            if(nft.staked) stakedNfts.push(nft);
        });
        return stakedNfts;
    });

    useEffect(() => {
        props.setStakedNftCount(nfts.length);
    }, []);

    return (
        <>
            <div><h4 className="your-avatars">Your Staked Avatars</h4></div>
            <div className="avatars">
                {nfts.length > 0 ?
                    nfts.map(avatar => (
                        <NftBox key={avatar.id} nftItem={avatar} />
                    ))
                :
                    accountLoading?
                        <CircularProgress size={130} color="inherit" style={{margin: "10em auto"}} />
                    :
                        <div style={{margin: "10em auto"}}>
                            <h4>You have no Staked Avatars</h4>
                        </div>
                }
            </div>
            <div className="claim-all">
                <div className="available-claim">
                    Available to claim: <span className="yellow-bold"> 0 BKWZ</span>
                </div>
                <div className="all-claim-button">CLAIM ALL</div>
            </div>
        </>
    )
}

export default StakingNFT;