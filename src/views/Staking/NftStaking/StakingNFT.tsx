import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3Context } from "../../../hooks";
import { IReduxState } from "../../../store/slices/state.interface";
import { IAvatarData } from "src/store/slices/account-slice";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../../store/slices/pending-txns-slice";
import "../Staking.scss";
import { nft1 } from "../../../constants/img";
import classNames from "classnames";

interface INftStakingProps {
    avatarItem: IAvatarData;
}

function NftBox({avatarItem}: INftStakingProps) {
    return(
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
    )
}

function SkeletonGroup() {
    return(
        <>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>
            <div className="nft-box" style={{borderWidth: "0"}}>
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" variant="circle" height={200} width={200} />
                <Skeleton className="style-skeleton" height={40} width={"50%"} />
                <Skeleton className="style-skeleton" height={50} width={"80%"} />
                <Skeleton className="style-skeleton" height={60} width={"70%"} />
            </div>    
        </>    
    )
}

function StakingNFT() {

    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const accountLoading = useSelector<IReduxState, boolean>(state => {
        return state.account.loading;
    });

    const avatarData = useSelector<IReduxState, IAvatarData[]>(state => {
        return state.account.balances.avatarData;
    });

    return (
        <>
            <div><h4 className="your-avatars">Your Staked Avatars</h4></div>
            {/* <SkeletonGroup /> */}
            <div className="avatars">
                {!accountLoading ?
                    avatarData.map(avatar => (
                        <NftBox key={avatar.id} avatarItem={avatar} />
                    ))
                :
                    <SkeletonGroup />
                }
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