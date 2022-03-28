import { Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Dao.scss";
import { dao } from "../../constants/img";

function Dao() {
    return (
        <section className='container-fluid dao' id='dao'>
            <div className='dao-content'>
                <iframe src="https://snapshot.org/#/blockways.eth"></iframe>
            </div>
        </section>
    );
}

export default Dao;
