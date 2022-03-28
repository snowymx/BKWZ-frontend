import { useEffect, useState, MouseEvent } from "react";
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
    setUnStakedNftCount: (count: number) => void;
}

interface INftItemProps {
    nftItem: INft;
}

function NftBox({ nftItem }: INftItemProps) {
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
        dispatch(
            fetchNftDetails({
                id: nftItem.id,
                avatarId: nftItem.avatarId,
                staked: nftItem.staked,
                rarity: rarityName,
                image: nftImage,
            }),
        );
    };

    useEffect(() => {
        if (baseUri) loadMetadata(baseUri + nftItem.avatarId + ".json").then(data => onloadMetadata(data.data));
    }, []);

    return (
        <div className="nft-box">
            <h5>Potential daily yield:</h5>
            <h5 className="yellow-bold">1.00 BKWZ</h5>
            <div className="nft-image">
                <img src={nftItem.image} style={{ display: imageLoaded ? "block" : "none" }} alt="nft" onLoad={() => setImageLoaded(true)} onError={() => setImageError(true)} />
                {!imageLoaded && imageError && <Skeleton className="style-skeleton" variant="rect" height={263} width={263} style={{ borderRadius: "20px" }} />}
                {!imageLoaded && !imageError && <Skeleton className="style-skeleton" variant="rect" height={263} width={263} style={{ borderRadius: "20px" }} />}
                {/* {!imageLoaded && !imageError && <div className="error-image">Failed</div>}                 */}
            </div>
            <h5 className="gray">Rarity:</h5>
            {nftItem.rarity ? <h5 className={nftItem.rarity}></h5> : <Skeleton className="style-skeleton" height={22} width={"35%"} />}
            <hr style={{ width: "70%" }} />
            <h5 style={{ marginTop: "10px" }}>Stake your avatar to earn BKWZ</h5>
            <div className="nft-button">STAKE</div>
        </div>
    );
}

function SkeletonGroup() {
    return (
        <>
            <div className="nft-box" style={{ borderWidth: "0" }}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <br />
                <Skeleton className="style-skeleton" variant="rect" height={200} width={200} style={{ borderRadius: "20px" }} />
                <br />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <br />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <br />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
        </>
    );
}

function UnStakingNFT(props: PropsInterface) {
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
        let unStakedNfts: Array<INft> = [];
        state.nfts.map(nft => {
            if (!nft.staked) unStakedNfts.push(nft);
        });
        return unStakedNfts;
    });

    useEffect(() => {
        props.setUnStakedNftCount(nfts.length);
    });

    return (
        <>
            <div>
                <h4 className="your-avatars">Your Unstaked Avatars</h4>
            </div>
            <div className="avatars">
                {nfts.length > 0 ? (
                    nfts.map(avatar => <NftBox key={avatar.id} nftItem={avatar} />)
                ) : accountLoading ? (
                    <CircularProgress size={130} color="inherit" style={{ margin: "10em auto" }} />
                ) : (
                    <div style={{ margin: "10em auto" }}>
                        <h4>You have no Unstaked Avatars</h4>
                    </div>
                )}
            </div>
            <div className="stake-all">
                <div className="stake-all-button">Stake All</div>
            </div>
        </>
    );
}

export default UnStakingNFT;
