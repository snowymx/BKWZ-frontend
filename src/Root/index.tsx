import { useEffect } from "react";
import { HashRouter, withRouter, useLocation, BrowserRouter } from "react-router-dom";
import App from "./App";

function Root() {

    function _ScrollToTop(props: any) {
        const { pathname } = useLocation();
        useEffect(() => {
            var position:any = document.querySelector("#root-child");
            position.scrollTop = 0;
        }, [pathname]);
        return props.children;
    }
    const ScrollToTop = withRouter(_ScrollToTop);

    const app = () => (
        <HashRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </HashRouter>
    );

    return app();
}

export default Root;
