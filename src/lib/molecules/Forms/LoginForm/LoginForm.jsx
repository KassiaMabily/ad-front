import React, { useState } from 'react';

import { setLoading } from "../../../../redux/actions/AuxActions";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import './style.css';
import { login } from "../../../services/auth"; 

function LoginForm({ history, setLoading }) {

    const [ user, setUser ] = useState('');
    const [ password, setPassword] = useState('');
    const [ error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        if (!user || !password) {
            setLoading(false);
            setError("Preencha todos os campos para continuar!");
        } else {
            try {
                await login(user, password);
                setLoading(false);
                history.replace('/');
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
                            placeholder='user ou email' 
                            name="user" 
                            value={user} 
                            onChange={(e) => setUser(e.target.value) } 
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

                    {/* </input> */}
                </form>
                {/* <Link className='btnLoginGoogle' to="/signup">
                    Criar minha conta
                </Link> */}
            </div>

            { error && <p className='aviso_erro'>{error}</p>}

            <div className='aviso'>
                Ao se inscrever, você concorda com nossos <a href='https://google.com'>Termos de Serviço</a> e <a href='https://google.com'>Política de Privacidade</a>.
                </div>
            <div className='senhaPerdida'>
                <a href='https://google.com'> Esqueci minha senha</a>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    is_loading: state.loadingState.is_loading,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));