import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import { trim, prettifySeconds } from "../../helpers";
import { changePresale, changeApproval } from "../../store/slices/presale-thunk";
import "./publicsale.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";

function Publicsale() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const mimBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.mim;
    });
    const trimBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.trim;
    });
    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });
    const purchaseAllowance = useSelector<IReduxState, number>(state => {
        return state.account.presale && state.account.presale.mim;
    });
    const claimAllowance = useSelector<IReduxState, number>(state => {
        return state.account.presale && state.account.presale.trim;
    });
    const currentBlockTime = useSelector<IReduxState, number>(state => {
        return state.app.currentBlockTime;
    });
    const priceTrimPublic = useSelector<IReduxState, number>(state => {
        return state.app.priceTrimPublic;
    });
    const maxMimLimitPublic = useSelector<IReduxState, number>(state => {
        return state.app.maxMimLimitPublic;
    });
    const amimBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.amim;
    });
    const claimable = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.claimable;
    });
    const mimRaised = useSelector<IReduxState, number>(state => {
        return state.app.mimRaised;
    });
    const totalpTokenAmountToDistribute = useSelector<IReduxState, number>(state => {
        return state.app.totalpTokenAmountToDistribute;
    });
    const closingTimeStamp = useSelector<IReduxState, number>(state => {
        return state.app.closingTimeStamp;
    });
    const publicSaleOpen = true;

    const setMax = () => {
        if (view === 0) {
            setQuantity(+mimBalance < maxMimLimitPublic ? mimBalance : publicsaleRestMimAmount.toString());
        } else {
            setQuantity(trimBalance);
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    const onChangePresale = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "purchase" ? messages.before_purchase : messages.before_claim }));
        } else {
            await dispatch(changePresale({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const hasAllowance = useCallback(
        token => {
            if (token === "mim") return purchaseAllowance > 0;
            if (token === "trim") return claimAllowance > 0;
            return 0;
        },
        [purchaseAllowance, claimAllowance],
    );

    const publicsaleRestMimAmount = maxMimLimitPublic - +amimBalance;
    const closingTime = new Date(closingTimeStamp * 1000);
    // const nowTimeStamp = Math.floor(Number(new Date()) / 1000);
    const [claimStart, setClaimStart] = useState( currentBlockTime > closingTimeStamp );
    const [counter, setCounter] = useState(Math.abs(closingTimeStamp - currentBlockTime));
    useEffect(() => {
        if(claimStart) setTimeout(() => setCounter(counter + 1), 1000);
        else setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div className="presale-view">
            <Zoom in={true}>
                <div className="presale-card">
                    <Grid className="presale-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="presale-card-header">
                                <p className="presale-card-header-title">Public Sale</p>
                            </div>
                        </Grid>
                        <div className="presale-card-area">
                            <div className="presale-card-description">
                                <p className="presale-card-description-text">Swap your MIM for a fixed TRIM value. The Public Event will last from now until on January 20th</p>
                            </div>
                        </div>
                        <div className="presale-card-metrics">
                            <div className="presale-card-tvl">
                                <p className="presale-card-metrics-title">Start time</p>
                                <p className="presale-card-metrics-value">
                                    {closingTimeStamp ? <>{closingTime.toLocaleTimeString("en-US") + " " + closingTime.toLocaleDateString("en-US")}</> : <Skeleton width="150px" />}
                                </p>
                                {!claimStart && <p className="presale-card-metrics-title">Remaining time by launching</p>}
                                {claimStart && <p className="presale-card-metrics-title">Launching lasted time</p>}
                                <p className="presale-card-metrics-value">{<>{prettifySeconds(counter)}</>}</p>
                            </div>
                        </div>
                    </Grid>
                </div>
            </Zoom>
            <Zoom in={true}>
                <div className="presale-card">
                    <Grid className="presale-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="presale-card-header">
                                <p className="presale-card-header-sub-title">Public Sale</p>
                            </div>
                        </Grid>
                        <div className="presale-card-area">
                            <div className="presale-card-description">
                                <p className="presale-card-description-text">
                                    You can participate Trim's Public Sale. You can deposit up to 100,000 MIM at a rate of {priceTrimPublic} MIM-TRIM
                                </p>
                                {address && <p className="presale-card-description-text">$ {trim(+amimBalance)} MIM deposited for you</p>}
                                <p className="presale-card-description-text">$ {trim(+mimRaised)} MIM raised</p>
                                <p className="presale-card-description-text">{trim(totalpTokenAmountToDistribute)} TRIM bought</p>
                            </div>
                            {!address && (
                                <div className="presale-card-wallet-notification">
                                    <div className="presale-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="presale-card-wallet-desc-text">Connect your wallet to participate in TRIM public sale!</p>
                                </div>
                            )}
                            {publicSaleOpen && address && (
                                <div>
                                    <div className="presale-card-action-area">
                                        <>
                                            <div className="presale-card-action-row">
                                                <OutlinedInput
                                                    type="number"
                                                    placeholder="Amount"
                                                    className="presale-card-action-input"
                                                    value={quantity}
                                                    onChange={e => setQuantity(e.target.value)}
                                                    labelWidth={0}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <div onClick={setMax} className="presale-card-action-input-btn">
                                                                <p>Max</p>
                                                            </div>
                                                        </InputAdornment>
                                                    }
                                                />

                                                <div className="presale-card-tab-panel">
                                                    {address && hasAllowance("mim") ? (
                                                        <div
                                                            className="presale-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "purchasing")) return;
                                                                onChangePresale("purchase");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "purchasing", "Purchase TRIM")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="presale-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_purchasing")) return;
                                                                onSeekApproval("mim");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_purchasing", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="presale-card-action-help-text">
                                                {quantity !== "" && <p>Note: <b>{+quantity / priceTrimPublic}</b> TRIM is expected.</p>}
                                            </div>
                                            <div className="presale-card-action-help-text">
                                                {address && !hasAllowance("mim") && <p>Note: The "Approve" transaction is only needed when exchanging token for the first time.</p>}
                                            </div>
                                        </>
                                    </div>
                                    <div className="presale-user-data">
                                        <div className="data-row">
                                            <p className="data-row-name">Your MIM Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="180px" /> : <>{trim(+mimBalance)} MIM</>}</p>
                                        </div>
                                        <div className="data-row">
                                            <p className="data-row-name">Your TRIM Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="180px" /> : <>{trim(+trimBalance)} TRIM</>}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
            <Zoom in={true}>
                <div className="presale-card">
                    <Grid className="presale-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="presale-card-header">
                                <p className="presale-card-header-sub-title">Claim</p>
                            </div>
                        </Grid>
                        <div className="presale-card-area">
                            <div className="presale-card-description">
                                <p className="presale-card-description-text">
                                    You can claim allowed amount of TRIM tokens.
                                </p>
                                {address && +claimable > 0 && <p className="presale-card-description-text">{claimable} TRIM can be claimed</p>}
                            </div>
                            {!address && (
                                <div className="presale-card-wallet-notification">
                                    <div className="presale-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="presale-card-wallet-desc-text">Connect your wallet to claim purchased TRIM token!</p>
                                </div>
                            )}
                            {publicSaleOpen && address && claimStart && (
                                <div>
                                    <div className="presale-card-action-area">
                                        <>
                                            <div className="presale-card-action-row">
                                                <div className="presale-card-tab-panel">
                                                    {address && hasAllowance("trim") ? (
                                                        +claimable ? (
                                                            <div
                                                                className="presale-card-tab-panel-btn"
                                                                onClick={() => {
                                                                    if (isPendingTxn(pendingTransactions, "claiming")) return;
                                                                    onChangePresale("claim");
                                                                }}
                                                            >
                                                                <p>{txnButtonText(pendingTransactions, "claiming", "claim TRIM")}</p>
                                                            </div>
                                                        ) : (
                                                            <div className="presale-card-tab-panel-btn">
                                                                <p>Already claimed</p>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div
                                                            className="presale-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_claiming")) return;
                                                                onSeekApproval("trim");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_claiming", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="presale-card-action-help-text">
                                                {address && !hasAllowance("trim") && <p>Note: The "Approve" transaction is only needed when exchanging token for the first time.</p>}
                                            </div>
                                        </>
                                    </div>
                                </div>
                            )}
                            {publicSaleOpen && address && !claimStart && (
                                <div>
                                    <div className="presale-card-action-area">
                                        <>
                                            <div className="presale-card-action-row">
                                                <div className="presale-card-tab-panel">
                                                    <div className="presale-card-tab-panel-btn">
                                                        <p>Coming Soon</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default Publicsale;
