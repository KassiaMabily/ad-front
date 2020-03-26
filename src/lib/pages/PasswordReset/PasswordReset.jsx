import React, { useEffect } from "react";
import PasswordResetForm from '../../molecules/Forms/PasswordResetForm';
import { useLocation } from "react-router-dom";
import { TOKEN_KEY } from "../../services/auth";
import { errorMessage } from "../../services/messageService";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PasswordReset() {

    let query = useQuery();

    useEffect(() => {
        let token = query.get("token");
        if(token){
            localStorage.setItem(TOKEN_KEY, token);
        }else{
            errorMessage("Erro", "Token inválido")
        }
    }, []);
    
	return (
		<div className="bgContainerLogin">
            <div className="LoginContainerBack" />
            <div className="LoginContainer">
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={require('./../../assets/images/logo.png')} alt="Logo" className="logoLogin" />
                </div>
                <div>
                    <PasswordResetForm />
                </div>
                <div className='senhaPerdida'>
                    Já tem conta? Clique <a href='/'>aqui</a>
                </div>
            </div>
            <div className='slogan_footer'>
                2020 © powered by 4Rockets
            </div>
        </div >
	);
}

export default PasswordReset;
