import React, { useEffect, useState } from "react";
import { Grid, Zoom } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "../../../hooks";
import { IReduxState } from "../../../store/slices/state.interface";
import { INft } from "src/store/slices/nfts-slice";
import "../Staking.scss";
import classNames from "classnames";
import StakingNFT from "./StakingNFT";
import UnStakingNFT from "./UnStakingNFT";
import { unset } from "lodash";

function NftStaking() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [stakedCount, setStakedCount] = useState(0);
    const [unStakedCount, setUnStakedCount] = useState(0);

    const avatarBalance = useSelector<IReduxState, number>(state => {
        return state.account.balances.avatarBalance;
    });

    const accountLoading = useSelector<IReduxState, boolean>(state => {
        return state.account.loading;
    });

    const [staking, setStaking] = useState(true);
    const onStaking = (_set:boolean) => {
        setStaking(_set);
    };

    const nfts = useSelector<IReduxState, INft[]>(state => {
        return state.nfts;
    });

    useEffect(() => {   
        let _stakedCount = 0;
        let _unStakedCount = 0;
        nfts.map(nft => {
            if(nft.staked) _stakedCount ++;
            else _unStakedCount ++;
        });
        setStakedCount(_stakedCount);     
        setUnStakedCount(_unStakedCount);
    }, [nfts]);

    const setStakedNftCount = (arg: number) => {
        // console.log(arg);
        // setStakedCount(arg);
    }

    const setUnStakedNftCount = (arg: number) => {
        // console.log(arg);
        // setUnStakedCount(arg);
    }

    return (
        <Zoom in={true}>
            <div className="tran-box">
                <div className="stake-state">
                    <div className={classNames("staked", { active: staking })} onClick={() => onStaking(true) }>
                        STAKED - {accountLoading? <CircularProgress size={15} color="inherit" /> : stakedCount}
                    </div>
                    <div className={classNames("unstaked", { active: !staking })} onClick={() => onStaking(false)}>
                        UNSTAKED - {accountLoading? <CircularProgress size={15} color="inherit" /> : unStakedCount}
                    </div>
                </div>
                {staking && <StakingNFT setStakedNftCount = {setStakedNftCount} />}
                {!staking && <UnStakingNFT setUnStakedNftCount = {setUnStakedNftCount} />}
            </div>
        </Zoom>
    );
}

export default NftStaking;
