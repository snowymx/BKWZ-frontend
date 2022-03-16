import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { MimTokenContract, AvatarNftContract } from "../../abi";
import { clearPendingTxn, fetchPendingTxns, getMintTypeText } from "./pending-txns-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountSuccess, getBalances } from "./account-slice";
import { loadAppDetails } from "./app-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "../../store/slices/messages-slice";
import { messages } from "../../constants/messages";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import { waitForDebugger } from "inspector";

interface IChangeApproval {
    token: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const changeApproval = createAsyncThunk("mint/changeApproval", async ({ token, provider, address, networkID }: IChangeApproval, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);

    const signer = provider.getSigner();
    const mimContract = new ethers.Contract(addresses.MIM_ADDRESS, MimTokenContract, signer);

    let approveTx;
    try {
        const gasPrice = await getGasPrice(provider);

        if (token === "mim") {
            approveTx = await mimContract.approve(addresses.AVATARNFT_ADDRESS, ethers.constants.MaxUint256, { gasPrice });
        }

        const text = "Approve " + (token === "mim" ? "Purchasing" : "Claiming");
        const pendingTxnType = token === "mim" ? "approve_purchasing" : "approve_Claiming";

        dispatch(
            fetchPendingTxns({
                txnHash: approveTx.hash,
                text,
                type: pendingTxnType,
            }),
        );
        await approveTx.wait();
        dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (approveTx) {
            dispatch(clearPendingTxn(approveTx.hash));
        }
    }

    await sleep(2);

    const purchaseAllowance = await mimContract.allowance(address, addresses.AVATARNFT_ADDRESS);

    return dispatch(
        fetchAccountSuccess({
            mint: {
                mim: Number(purchaseAllowance),
            },
        }),
    );
});

interface IChangeMint {
    value: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const changeMint = createAsyncThunk("mint/changeMint", async ({ value, provider, address, networkID }: IChangeMint, { dispatch }) => {
    if (!provider) {
        dispatch(warning({ text: messages.please_connect_wallet }));
        return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const avatarContract = new ethers.Contract(addresses.AVATARNFT_ADDRESS, AvatarNftContract, signer);

    let mintTx;

    try {
        const gasPrice = await getGasPrice(provider);
        mintTx = await avatarContract.mint({ gasPrice });
        const pendingTxnType = "minting";
        dispatch(
            fetchPendingTxns({
              txnHash: mintTx.hash,
              text: getMintTypeText(),
              type: pendingTxnType,
            })
          );
          await mintTx.wait();
          dispatch(success({ text: messages.tx_successfully_send }));
    } catch (err: any) {
        return metamaskErrorWrap(err, dispatch);
    } finally {
        if (mintTx) {
            dispatch(clearPendingTxn(mintTx.hash));
        }
    }
    dispatch(info({ text: messages.your_avatar_mint_soom }));
    await sleep(10);
    await dispatch(loadAppDetails({ networkID, provider }));
    dispatch(info({ text: messages.your_avatar_successfully_minted }));
    return;
});
