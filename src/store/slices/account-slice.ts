import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { AvatarNftContract } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { fetchNft, clearNfts } from "./nfts-slice";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export interface IAvatarData {
    id: string;
    uri: string;
    staked: boolean;
}

interface IAccountBalances {
    balances: {
        avax: string;
        avatarBalance: string;
        avatarData: IAvatarData[];
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances, { dispatch }): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);
    const avaxBalance = await provider.getBalance(address);
    const avatarContract = new ethers.Contract(addresses.AVATARNFT_ADDRESS, AvatarNftContract, provider);
    const avatarBalance = await avatarContract.balanceOf(address);

    let avatarData: IAvatarData[] = [];

    dispatch(clearNfts());
    for(var i = 0; i < avatarBalance; i ++) {
        const avatarId = await avatarContract.tokenOfOwnerByIndex(address, i);
        const avatarUri = await avatarContract.tokenURI(avatarId);
        dispatch(
            fetchNft({
                id: avatarId, uri: avatarUri, staked: false, rarity: "", image: "",
            })
        );
        avatarData.push({ id: avatarId, uri: avatarUri, staked: false});
    }

    return {
        balances: {
            avax: ethers.utils.formatEther(avaxBalance),
            avatarBalance,
            avatarData,
        },
    };
});

interface ILoadAccountDetails {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IUserAccountDetails {
    balances: {
        avax: string;
        avatarBalance: number;
        avatarData: IAvatarData[];
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails, { dispatch }): Promise<IUserAccountDetails> => {
    const addresses = getAddresses(networkID);
    const avaxBalance = await provider.getBalance(address);
    const avatarContract = new ethers.Contract(addresses.AVATARNFT_ADDRESS, AvatarNftContract, provider);
    const avatarBalance = await avatarContract.balanceOf(address);

    let avatarData: IAvatarData[] = [];

    dispatch(clearNfts());
    for(var i = 0; i < avatarBalance; i ++) {
        const avatarId = await avatarContract.tokenOfOwnerByIndex(address, i);
        const avatarUri = await avatarContract.tokenURI(avatarId);
        dispatch(
            fetchNft({
                id: avatarId, uri: avatarUri, staked: false, rarity: "", image: "",
            })
        );
        avatarData.push({ id: avatarId, uri: avatarUri, staked: false});
    }

    return {
        balances: {
            avax: ethers.utils.formatEther(avaxBalance),
            avatarBalance: Number(avatarBalance),
            avatarData,
        },
    };
});

export interface IAccountSlice {
    loading: boolean;
    balances: {
        avax: string;
        avatarBalance: string;
        avatarData: IAvatarData[];
    };
}

const initialState: IAccountSlice = {
    loading: true,
    balances: { avax: "", avatarBalance: "", avatarData: [] },
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAccountDetails.pending, state => {
                state.loading = true;
            })
            .addCase(loadAccountDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAccountDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
            .addCase(getBalances.pending, state => {
                state.loading = true;
            })
            .addCase(getBalances.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(getBalances.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            })
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
