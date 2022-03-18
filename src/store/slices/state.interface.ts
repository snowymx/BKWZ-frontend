import { IPendingTxn } from "./pending-txns-slice";
import { IAccountSlice } from "./account-slice";
import { IAppSlice } from "./app-slice";
import { MessagesState } from "./messages-slice";
import { INft } from "./nfts-slice";

export interface IReduxState {
    pendingTransactions: IPendingTxn[];
    account: IAccountSlice;
    app: IAppSlice;
    messages: MessagesState;
    nfts: INft[];
}
