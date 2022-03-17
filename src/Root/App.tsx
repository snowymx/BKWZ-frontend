import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAddress, useWeb3Context } from "../hooks";
import { loadAppDetails } from "../store/slices/app-slice";
import { loadAccountDetails } from "../store/slices/account-slice";
import { IReduxState } from "../store/slices/state.interface";
import Loading from "../components/Loader";
import ViewBase from "../components/ViewBase";
import { NotFound, Dashboard, Gameplay, Dao, Beta, Token, Minting, Staking } from "../views";
import "./style.scss";

function App() {
    const dispatch = useDispatch();

    const { connect, provider, hasCachedProvider, chainID, connected } = useWeb3Context();
    const address = useAddress();

    const [walletChecked, setWalletChecked] = useState(false);

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    async function loadDetails(whichDetails: string) {
        let loadProvider = provider;

        if (whichDetails === "app") {
            loadApp(loadProvider);
        }

        if (whichDetails === "account" && address && connected) {
            loadAccount(loadProvider);
            loadApp(loadProvider);
        }
    }

    const loadApp = useCallback(
        loadProvider => {
            dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
        },
        [connected],
    );

    const loadAccount = useCallback(
        loadProvider => {
            dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
        },
        [connected],
    );

    useEffect(() => {
        if (hasCachedProvider()) {
            connect().then(() => {
                setWalletChecked(true);
            });
        } else {
            setWalletChecked(true);
        }
    }, []);

    useEffect(() => {
        if (walletChecked) {
            loadDetails("app");
            loadDetails("account");
        }
    }, [walletChecked]);

    useEffect(() => {
        if (connected && walletChecked) {
            loadDetails("app");
            loadDetails("account");
        }
    }, [connected]);

    // if (isAppLoading) return <Loading />;

    return (
        <ViewBase>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/gameplay">
                    <Gameplay />
                </Route>
                <Route exact path="/dao">
                    <Dao />
                </Route>
                <Route exact path="/beta">
                    <Beta />
                </Route>                
                <Route exact path="/token">
                    <Token />
                </Route>              
                <Route exact path="/minting">
                    <Minting />
                </Route>            
                <Route exact path="/staking">
                    <Staking />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </ViewBase>
    );
}

export default App;
