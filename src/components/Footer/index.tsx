import { Zoom, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Footer.scss";
import { discord, telegram, youtube, medium } from "../../constants/img";

const useStyles = makeStyles(theme => ({
    textStart: {
        textAlign: "left",
    },
}));

function Footer() {
    const classes = useStyles();
    return (
        <section>
            <footer className='container-fluid footer'>
                <div className='container'>
                <Link href="https://blockways.medium.com/" target="_blank">
                    <img src={medium} alt='medium'></img>
                </Link>
                <Link href="https://t.me/+D83aFKHW3Pk1OTFh" target="_blank">
                <img src={telegram} alt='telegram'></img>
                </Link>
                <Link href="https://www.youtube.com/channel/UCxsG7k4uyzx-6vPxhGO6Cow" target="_blank">
                <img src={youtube} alt='youtube'></img>
                </Link>
                <Link href="https://discord.gg/gnfkHywqQP" target="_blank">
                    <img src={discord} alt='discord'></img>
                </Link>
                </div>
            </footer>
        </section>
    );
}

export default Footer;
