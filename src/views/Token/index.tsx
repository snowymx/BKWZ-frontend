import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Token.scss";
import { chart, traderjoe } from "../../constants/img";

function Dao() {
    return (
        <section className='container-fluid token' id='token'>
            <div className='content'>
                <div className='container'>
                <div className='intro'>
                <div className='row dice-group' style={{padding: "5em 0"}}>
                    <img src={chart} alt="dice" style={{width: "100%"}} />
                </div>
                <br />
                <br />
                <div className='row dice-group' style={{padding: "5em 0"}}>
                    <img src={traderjoe} alt="dice" style={{width: "100%"}} />
                </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default Dao;
