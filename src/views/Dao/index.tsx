import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Dao.scss";
import { dao } from "../../constants/img";

function Dao() {
    return (
        <section className='container-fluid dao' id='dao' style={{padding: "15em 0"}}>
            <div className='content'>
                <div className='container'>
                <div className='intro'>
                <div className='row dice-group'>
                    <br />
                    <img src={dao} alt="dice" style={{width: "100%"}} />
                    <br />
                </div>
                </div>
                </div>
            </div>
        </section>
    );
}

export default Dao;
