import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAll } from "src/helpers";

export interface IModals {
    mint: boolean;
    justMint: number;
    avaxDeposit: boolean;
}

const initialState: IModals = {
    mint: false,
    justMint: 0,
    avaxDeposit: false,
};

const modalSlice = createSlice({
    name: "modals",
    initialState,
    reducers: {
        setMintModal(state, action: PayloadAction<boolean>) {
            state.mint = action.payload;
        },
        setJustMint(state, action: PayloadAction<number>) {
            state.justMint = action.payload;
        },
        setAvaxDepositModal(state, action: PayloadAction<boolean>) {
            state.avaxDeposit = action.payload;
        },
    },
});

export const { setMintModal, setJustMint, setAvaxDepositModal } = modalSlice.actions;

export default modalSlice.reducer;
