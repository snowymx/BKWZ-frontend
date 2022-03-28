import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAll } from "src/helpers";

export interface INft {
    id: string;
    avatarId: string;
    staked: boolean;
    rarity: string;
    image: string;
}

const initialState: Array<INft> = [];

const nftsSlice = createSlice({
    name: "avatarNfts",
    initialState,
    reducers: {
        fetchNft(state, action: PayloadAction<INft>) {
            state.push(action.payload);
        },
        clearNfts(state) {
            state.splice(0, state.length);
        },
        fetchNftDetails(state, action: PayloadAction<INft>) {
            const target = state.find(x => x.id == action.payload.id);
            if (target) {
                setAll(target, action.payload);
            }
        },
    },
});

export const { fetchNft, clearNfts, fetchNftDetails } = nftsSlice.actions;

export default nftsSlice.reducer;
