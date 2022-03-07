import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { TrimTokenContract, PresaleContract } from "../../abi";
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
        const mimPrice = getTokenPrice("MIM");
        const addresses = getAddresses(networkID);

        const currentBlock = await provider.getBlockNumber();
        const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
        const trimContract = new ethers.Contract(addresses.TRIM_ADDRESS, TrimTokenContract, provider);
        const presaleContract = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, provider);

        const maxMimLimitPublic = await presaleContract.MAX_MIM_LIMIT_PUBLIC();
        const priceTrimPublic = await presaleContract.PRICE_TRIM_PUBLIC();
        const mimRaised = await presaleContract.mimRaised();
        const totalpTokenAmountToDistribute = await presaleContract.totalpTokenAmountToDistribute();
        const closingTimeStamp = await presaleContract.closingTime();

        return {
            currentBlock,
            currentBlockTime,
            priceTrimPublic: priceTrimPublic.toNumber(),
            closingTimeStamp: closingTimeStamp.toNumber(),
            maxMimLimitPublic: Number(ethers.utils.formatUnits(maxMimLimitPublic)),
            mimRaised: Number(ethers.utils.formatUnits(mimRaised)),
            totalpTokenAmountToDistribute: Number(ethers.utils.formatUnits(totalpTokenAmountToDistribute, "gwei")),
        };
    },
);

const initialState = {
    loading: true,
};

export interface IAppSlice {
    currentBlock: number;
    currentBlockTime: number;
    loading: boolean;
    networkID: number;
    priceTrimPublic: number;
    maxMimLimitPublic: number;
    mimRaised: number;
    totalpTokenAmountToDistribute: number;
    closingTimeStamp: number;
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
