import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { AvatarNftContract } from "../../abi";
import { clearPendingTxn, fetchPendingTxns, getMintTypeText } from "./pending-txns-slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadAccountDetails } from "./account-slice";
import { loadAppDetails } from "./app-slice";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import { warning, success, info, error } from "../../store/slices/messages-slice";
import { messages } from "../../constants/messages";
import { setMintModal, setJustMint } from "./modals-slice";
import { getGasPrice } from "../../helpers/get-gas-price";
import { metamaskErrorWrap } from "../../helpers/metamask-error-wrap";
import { sleep } from "../../helpers";
import { waitForDebugger } from "inspector";

interface IChangeMint {
    amount: string;
    avax: string;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
    address: string;
    networkID: Networks;
}

export const changeMint = createAsyncThunk("mint/changeMint", async ({ amount, avax, provider, address, networkID }: IChangeMint, { dispatch }) => {
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
        mintTx = await avatarContract.mintAvatar(amount, { gasPrice, value: ethers.utils.parseEther(avax) });
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
    await sleep(20);
    dispatch(info({ text: messages.your_avatar_successfully_minted }));
    await dispatch(loadAppDetails({ networkID, provider }));
    await dispatch(loadAccountDetails({ networkID, provider, address }));
    dispatch(setJustMint(Number(amount)));
    await sleep(0.5);
    dispatch(setMintModal(true));
    return;
});
