import React, { useState } from 'react';

import { setLoading, setOpenPassword } from "../../../../redux/actions/AuxActions";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import './style.css';
import { resetpassword, logout } from "../../../services/auth";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function PasswordResetForm({ history, setLoading, setOpenPassword }) {

    const [ password, setPassword ] = useState('');
    const [ error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!password) {
            setLoading(false);
            setError("Preencha todos os campos para continuar!");
        } else {
            try {
                await resetpassword(password);
                setLoading(false);
                setOpenPassword(false);
                MySwal.fire({
                    title: "Sucesso",
                    text: "Sua senha foi alterada, favor logar novamente",
                    type: 'success',
                    allowOutsideClick: false,
                    showCancelButton: true,
                }).then(result => {
                    if (result.value) {
                        logout();
                        // history.go('/login');

                        window.location.href = "/login"
                    }
                })
            } catch (err) {
                setLoading(false);
                console.log(err)
                setError("Houve um problema com o login, verifique suas credenciais.");
            }
        }

    }

    return (

        <form onSubmit={(e) => handleSubmit(e) }>
            <div className='inputs'>
                <input 
                    className='input' 
                    type="password" 
                    placeholder='Digite sua nova senha' 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value) } 
                />
            </div>
            <input type="submit" className='btnLogin' value='Alterar' />
        </form>
            
    );
}

const mapStateToProps = state => ({
    is_loading: state.loadingState.is_loading,
    is_open: state.loadingState.is_open,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setLoading, setOpenPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordResetForm));