import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { TrimTokenContract, PresaleContract, AvatarNftContract } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getTokenPrice } from "../../helpers";
import { RootState } from "../store";
import { BigNumber } from "ethers";

var utils = require("ethers").utils;

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        // const mimPrice = getTokenPrice("MIM");
        const addresses = getAddresses(networkID);

        // const currentBlock = await provider.getBlockNumber();
        // const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        const avatarNftContract = new ethers.Contract(addresses.AVATARNFT_ADDRESS, AvatarNftContract, provider);

        const totalSupply = await avatarNftContract.totalSupply();
        const baseUri = await avatarNftContract.baseUri();
        const avatarPrice = await avatarNftContract.price();

        return {
            totalSupply,
            baseUri,
            avatarPrice: Number(ethers.utils.formatEther(avatarPrice)),
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    loading: boolean;
    networkID: number;
    totalSupply: number;
    baseUri: string;
    avatarPrice: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
