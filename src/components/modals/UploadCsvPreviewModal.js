import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Table from '../subcomponent/GenericTable';
import DefaultButton from '../form/muiWrappers/DefaultButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const UploadCsvPreviewModal = ({ setOpen, open, onSave, data = [] }) => {
    const handleClose = () => {
        setOpen(false);
    };
    const handleOnSave = () => {
        onSave();
        handleClose();
    }
    return (
        <BootstrapDialog
            onClose={handleClose}
            data-testid="upload-csv-modal"
            aria-labelledby="upload-csv-modal"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="upload-csv-modal">
                Upload Data Preview
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon data-testid="close-icon" />
            </IconButton>
            <DialogContent dividers>
                <Table data={data} />
            </DialogContent>
            <DialogActions>
                <DefaultButton autoFocus onClick={handleOnSave}>
                    Save changes
                </DefaultButton>
            </DialogActions>
        </BootstrapDialog>
    );
}

UploadCsvPreviewModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.string),
    ).isRequired,
};

export default UploadCsvPreviewModal;