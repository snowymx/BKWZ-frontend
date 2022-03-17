import React, { useState } from "react";
import { Grid, Zoom } from "@material-ui/core";
import { useWeb3Context } from "../../../hooks";
import "../Staking.scss";
import classNames from "classnames";
import StakingNFT from "./StakingNFT";
import UnStakingNFT from "./UnStakingNFT";

function NftStaking() {
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [staking, setStaking] = useState(true);
    const onStaking = (_set:boolean) => {
        setStaking(_set);
    };

    return (
        <Zoom in={true}>
            <div className="tran-box">
                <div className="stake-state">
                    <div className={classNames("staked", { active: staking })} onClick={() => onStaking(true) }>
                        STAKED - 7
                    </div>
                    <div className={classNames("unstaked", { active: !staking })} onClick={() => onStaking(false)}>
                        UNSTAKED - 1
                    </div>
                </div>
                {staking && <StakingNFT />}
                {!staking && <UnStakingNFT />}
            </div>
        </Zoom>
    );
}

export default NftStaking;
