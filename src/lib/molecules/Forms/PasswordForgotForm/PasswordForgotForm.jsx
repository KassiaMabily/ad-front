import React, { useState } from 'react';

import { setLoading } from "../../../../redux/actions/AuxActions";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import './style.css';
import { forgotpassword } from "../../../services/auth";
import { sucessMessage } from "../../../services/messageService";

function PasswordForgotForm({ history, setLoading }) {

    const [ email, setEmail ] = useState('');
    const [ error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!email) {
            setLoading(false);
            setError("Preencha todos os campos para continuar!");
        } else {
            try {
                await forgotpassword(email);
                setLoading(false);
                sucessMessage("Sucesso", "O link para redefinição da sua senha foi enviado para o seu e-mail")
            } catch (err) {
                setLoading(false);
                console.log(err)
                setError("Houve um problema com o login, verifique suas credenciais.");
            }
        }

    }

    return (
        <div className="LoginContainer">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={require('./../../../assets/images/logo.png')} alt="Logo" className="logoLogin" />
            </div>

            <div>
                <form onSubmit={(e) => handleSubmit(e) }>
                    <div className='inputs'>
                        <input 
                            className='input' 
                            type="text" 
                            placeholder='E-mail' 
                            name="user" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value) } 
                        />
                    </div>
                    <input type="submit" className='btnLogin' value='Enviar' />

                </form>
            </div>

            { error && <p className='aviso_erro'>{error}</p>}

            <div className='senhaPerdida'>
                Já tem conta? Clique <a href='/'>aqui</a>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    is_loading: state.loadingState.is_loading,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordForgotForm));