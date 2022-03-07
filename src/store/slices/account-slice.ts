import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { TrimTokenContract, MimTokenContract, PresaleContract } from "../../abi";
import { setAll } from "../../helpers";

import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "../../constants/blockchain";
import React from "react";
import { RootState } from "../store";
import { IToken } from "../../helpers/tokens";

interface IGetBalances {
    address: string;
    networkID: Networks;
    provider: StaticJsonRpcProvider | JsonRpcProvider;
}

interface IAccountBalances {
    balances: {
        mim: string;
        trim: string;
        amim: string;
    };
}

export const getBalances = createAsyncThunk("account/getBalances", async ({ address, networkID, provider }: IGetBalances): Promise<IAccountBalances> => {
    const addresses = getAddresses(networkID);

    const mimContract = new ethers.Contract(addresses.MIM_ADDRESS, MimTokenContract, provider);
    const mimBalance = await mimContract.balanceOf(address);
    const trimContract = new ethers.Contract(addresses.TRIM_ADDRESS, TrimTokenContract, provider);
    const trimBalance = await trimContract.balanceOf(address);
    const presaleContract = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, provider);
    const investorDetail = await presaleContract.investors(address);

    return {
        balances: {
            mim: ethers.utils.formatUnits(mimBalance),
            trim: ethers.utils.formatEther(trimBalance),
            amim: ethers.utils.formatEther(investorDetail.depositedAmount),
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
        mim: string;
        trim: string;
        amim: string;
        claimable: string;
    };
    presale: {
        mim: number;
        trim: number;
    };
}

export const loadAccountDetails = createAsyncThunk("account/loadAccountDetails", async ({ networkID, provider, address }: ILoadAccountDetails): Promise<IUserAccountDetails> => {
    let trimBalance = 0;
    let mimBalance = 0;
    let purchaseAllowance = 0;
    let claimAllowance = 0;
    let claimable = 0;
    let investorDetail = { tierType: 0, depositedAmount: 0, claimedAmount: 0, pTotalTokenAmount: 0 };

    const addresses = getAddresses(networkID);

    if (addresses.MIM_ADDRESS) {
        const mimContract = new ethers.Contract(addresses.MIM_ADDRESS, MimTokenContract, provider);
        mimBalance = await mimContract.balanceOf(address);
        purchaseAllowance = await mimContract.allowance(address, addresses.PRESALE_ADDRESS);
    }

    if (addresses.TRIM_ADDRESS) {
        const atnContract = new ethers.Contract(addresses.TRIM_ADDRESS, TrimTokenContract, provider);
        trimBalance = await atnContract.balanceOf(address);
        claimAllowance = await atnContract.allowance(address, addresses.PRESALE_ADDRESS);
    }

    if (addresses.PRESALE_ADDRESS) {
        const presaleContract = new ethers.Contract(addresses.PRESALE_ADDRESS, PresaleContract, provider);
        investorDetail = await presaleContract.investors(address);
        claimable = await presaleContract.getClaimableAmount(address);
    }

    return {
        balances: {
            mim: ethers.utils.formatUnits(mimBalance),
            trim: ethers.utils.formatUnits(trimBalance, "gwei"),
            amim: ethers.utils.formatEther(investorDetail.depositedAmount),
            claimable: ethers.utils.formatUnits(claimable),
        },
        presale: {
            mim: Number(purchaseAllowance),
            trim: Number(claimAllowance),
        },
    };
});

export interface IUserTokenDetails {
    allowance: number;
    balance: number;
    isAvax?: boolean;
}

export interface IAccountSlice {
    balances: {
        mim: string;
        trim: string;
        amim: string;
        claimable: string;
    };
    loading: boolean;
    tokens: { [key: string]: IUserTokenDetails };
    presale: {
        mim: number;
        trim: number;
    };
}

const initialState: IAccountSlice = {
    loading: true,
    balances: { mim: "", trim: "", amim: "", claimable: "" },
    tokens: {},
    presale: { mim: 0, trim: 0 },
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
            });
    },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
