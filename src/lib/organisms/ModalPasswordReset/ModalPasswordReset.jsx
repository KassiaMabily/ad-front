import React from 'react';

import { connect } from "react-redux";
import { setOpenPassword } from "./../../../redux/actions/AuxActions";
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PasswordResetForm from '../../molecules/Forms/PasswordResetForm'

function ModalPasswordReset({ setOpenPassword, openPassword }) {

    // const new_is_open = is_loading ? false : open ? true : false;

    return (
        <Dialog open={openPassword} onClose={()=> setOpenPassword(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Alterar senha</DialogTitle>
            <DialogContent>
                <PasswordResetForm />
            </DialogContent>
            <DialogActions>
            <Button onClick={()=> setOpenPassword(false)} color="primary">
                Cancelar
            </Button>
            </DialogActions>
        </Dialog>

    );
}

const mapStateToProps = state => ({
    openPassword: state.loadingState.openPassword,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setOpenPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalPasswordReset);