import React, { useState } from 'react';

import { setLoading } from "../../../../redux/actions/AuxActions";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import './style.css';
import { register } from "../../../services/auth";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function RegisterForm({ history, setLoading }) {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const [ error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            name: name, 
            email: email, 
            password: password
        }

        setLoading(true);
        if (!name || !email || !password) {
            setLoading(false);
            setError("Preencha todos os campos para continuar!");
        } else {
            try {
                await register(payload);
                setLoading(false);
                MySwal.fire({
                    title: "Sucesso",
                    text: "Cadastro realizado",
                    type: 'success',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: 'Fazer login'
                }).then(result => {
                    if (result.value) {
                        window.location.href = "/"
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
                            placeholder='Nome completo' 
                            name="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value) } 
                        />

                        <input 
                            className='input' 
                            type="text" 
                            placeholder='E-mail' 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value) } 
                        />

                        <input 
                            className='input' 
                            type="password" 
                            placeholder='senha' 
                            name="password" 
                            value={ password } 
                            onChange={(e) => setPassword(e.target.value) } 
                        />
                    </div>
                    <input type="submit" className='btnLogin' value='Entrar' />
                </form>
                <Link className='btnLoginGoogle' to="/login">
                    Já tenho conta
                </Link>
            </div>

            { error && <p className='aviso_erro'>{error}</p>}
        </div>
    );
}

const mapStateToProps = state => ({
    is_loading: state.loadingState.is_loading,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterForm));