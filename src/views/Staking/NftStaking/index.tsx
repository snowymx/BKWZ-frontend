import React, { useState } from "react";
import { Grid, Zoom } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "../../../hooks";
import { IReduxState } from "../../../store/slices/state.interface";
import "../Staking.scss";
import classNames from "classnames";
import StakingNFT from "./StakingNFT";
import UnStakingNFT from "./UnStakingNFT";

function NftStaking() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const avatarBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances.avatarBalance;
    });

    const accountLoading = useSelector<IReduxState, boolean>(state => {
        return state.account.loading;
    });

    const [staking, setStaking] = useState(true);
    const onStaking = (_set:boolean) => {
        setStaking(_set);
    };

    return (
        <Zoom in={true}>
            <div className="tran-box">
                <div className="stake-state">
                    <div className={classNames("staked", { active: staking })} onClick={() => onStaking(true) }>
                        STAKED - {accountLoading? <CircularProgress size={15} color="inherit" /> :avatarBalance}
                    </div>
                    <div className={classNames("unstaked", { active: !staking })} onClick={() => onStaking(false)}>
                        UNSTAKED - 0
                    </div>
                </div>
                {staking && <StakingNFT />}
                {!staking && <UnStakingNFT />}
            </div>
        </Zoom>
    );
}

export default NftStaking;
