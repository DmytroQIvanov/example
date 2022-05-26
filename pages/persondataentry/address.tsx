import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ModalBody from '../../components/PersonInteractionModal';
import AddressReport from "../../components/AddressReport/AddressReport";

export default function Address (){
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <>
            <Button onClick={handleOpen}>Open Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="flex h-full w-full items-center justify-center"
            >
                <div className="h-4/5 w-full lg:w-4/5">
                    <ModalBody onClose={handleClose} />
                </div>
            </Modal>
        </>
    )
}