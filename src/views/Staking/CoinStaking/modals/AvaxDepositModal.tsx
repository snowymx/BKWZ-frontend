import { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

export default function AvaxDepositModal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className="modal-box">
                    <h2 id="transition-modal-title">The mint is completed!</h2>
                    <hr />
                    <h4>Congratulations. You have received the following avatars:</h4>
                    <div className="continue-button" onClick={handleClose}>
                        continue
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}
