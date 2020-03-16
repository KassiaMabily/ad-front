import React from "react";
import LoginForm from '../../molecules/LoginForm';

function Login() {
	return (
		<div className="bgContainerLogin">
            <div className="LoginContainerBack" />
			<LoginForm />
            <div className='slogan_footer'>
                2020 © powered by 4Rockets
            </div>
        </div >
	);
}

export default Login;
