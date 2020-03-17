import React, { useState } from 'react';
import { withRouter, Link } from "react-router-dom";
import './style.css';
import { login } from "../../../services/auth"; 

function LoginForm({ history }) {

    const [ user, setUser ] = useState('');
    const [ password, setPassword] = useState('');
    const [ error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user || !password) {
            setError("Preencha todos os campos para continuar!");
        } else {
            try {
                await login(user, password);
                history.replace('/');
            } catch (err) {
                console.log(err)
                setError("Houve um problema com o login, verifique suas credenciais.");
            }
        }

    }

    return (
        <div className="LoginContainer">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={'https://www.adgrouptraining.com/templates/logoTopo.png'} alt="Logo" className="logoLogin" />
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
                <Link className='btnLoginGoogle' to="/signup">
                    Criar minha conta
                </Link>
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


export default withRouter(LoginForm);