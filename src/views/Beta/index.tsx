import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Beta.scss";
import { dao } from "../../constants/img";

function Beta() {
    return (
        <section className='container-fluid beta' id='beta'>
            <div className='content'>
                <div className='container'>
                <div className="gameplay-box" style={{padding: "10em 0"}}>
                    <span>COMING SOON</span>
                </div>
                <div className="gameplay-box" style={{padding: "10em 0"}}>
                    <span>DEMO GAME</span>
                </div>
                </div>
            </div>
        </section>
    );
}

export default Beta;
