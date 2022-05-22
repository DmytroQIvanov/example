// Overlay use className props to pass style properties to child component.
// To make this component work add className props to your child component manually.
// Here an example: https://gist.github.com/Miniplop/8f87608f8100e758fa5a4eb46f9d151f

import React from "react";
import styles from "../../styles/Modal.module.scss"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MUIModal from '@mui/material/Modal';

interface StyledProps {
    className?: string
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Modal = ({children, open, title, handleClose}: any) => {
    return (
        <MUIModal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography className={styles.title} id="modal-modal-title" variant="h6" component="h2">
                    { title }
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    { children }
                </Typography>
            </Box>
        </MUIModal>
    );
};

export default Modal;