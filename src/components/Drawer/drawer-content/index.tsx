import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import BondIcon from "../../../assets/icons/bond.svg";
import playIcon from "../../../assets/icons/arrows.svg";
import LogoIcon from "../../../assets/icons/logo.png";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import PresaleIcon from "../../../assets/icons/presale.svg";
import SaleIcone from "../../../assets/icons/sale.png";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import DocsIcon from "../../../assets/icons/stake.svg";
import GlobeIcon from "../../../assets/icons/wonderglobe.svg";
import classnames from "classnames";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("dao") >= 0 && page === "dao") {
            return true;
        }
        if (currentPath.indexOf("beta") >= 0 && page === "beta") {
            return true;
        }
        if (currentPath.indexOf("token") >= 0 && page === "token") {
            return true;
        }
        if (currentPath.indexOf("minting") >= 0 && page === "minting") {
            return true;
        }
        if (currentPath.indexOf("staking") >= 0 && page === "staking") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link>
                    <img alt="" src={LogoIcon} style={{ maxWidth: 200, marginTop: "2rem" }} />
                </Link>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://cchain.explorer.avax.network/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={DashboardIcon} /> */}
                            <p>Dashboard</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/gameplay"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "gameplay");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={playIcon} /> */}
                            <p>Gameplay</p>
                        </div>
                    </Link>

                    <Link
                        href="https://snapshot.org/#/blockways.eth" target="_blank"
                        // component={NavLink}
                        // to="/dao"
                        // isActive={(match: any, location: any) => {
                        //     return checkPage(location, "dao");
                        // }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={GlobeIcon} /> */}
                            <p>DAO</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/beta"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "beta");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={GlobeIcon} /> */}
                            <p>Beta</p>
                        </div>
                    </Link>

                    <Link
                        style={{display: "none"}}
                        component={NavLink}
                        to="/token"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "token");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={SaleIcone} /> */}
                            <p>Token</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/minting"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "minting");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={BondIcon} /> */}
                            <p>Minting</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        to="/staking"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "staking");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={StakeIcon} /> */}
                            <p>Staking</p>
                        </div>
                    </Link>
                </div>
            </div>
            <Social />
        </div>
    );
}

export default NavContent;
