import { BigNumber, ethers } from "ethers";
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

export interface IAvatarDetail {
    id: BigNumber;
    avatarId: BigNumber;
    staked: boolean;
}

interface IAccountBalances {
    balances: {
        avax: string;
        avatarBalance: number;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances, { dispatch }): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);
    const avaxBalance = await provider.getBalance(address);
    const avatarContract = new ethers.Contract(addresses.AVATARNFT_ADDRESS, AvatarNftContract, provider);
    const avatarBalance = await avatarContract.balanceOf(address);

    return {
        balances: {
            avax: ethers.utils.formatEther(avaxBalance),
            avatarBalance: Number(avatarBalance),
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
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails, { dispatch }): Promise<IUserAccountDetails> => {
    const addresses = getAddresses(networkID);
    const avaxBalance = await provider.getBalance(address);
    const avatarContract = new ethers.Contract(addresses.AVATARNFT_ADDRESS, AvatarNftContract, provider);
    const avatarBalance = await avatarContract.balanceOf(address);

    dispatch(clearNfts());

    const avatars:IAvatarDetail[] = await avatarContract.ownedAvatars(address);
    avatars.map(avatar => {
        dispatch(
            fetchNft({
                id: avatar.id.toString(),
                avatarId: avatar.avatarId.toString(),
                staked: avatar.staked,
                rarity: "",
                image: "",
            })
        );
    })

    return {
        balances: {
            avax: ethers.utils.formatEther(avaxBalance),
            avatarBalance: Number(avatarBalance),
        },
    };
});

export interface IAccountSlice {
    loading: boolean;
    balances: {
        avax: string;
        avatarBalance: number;
    };
}

const initialState: IAccountSlice = {
    loading: true,
    balances: { avax: "", avatarBalance: 0, },
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
