import React from "react";
import RegisterForm from '../../molecules/Forms/RegisterForm';

function Register() {
    
	return (
		<div className="bgContainerLogin">
            <div className="LoginContainerBack" />
			<RegisterForm />
            <div className='slogan_footer'>
                2020 © powered by 4Rockets
            </div>
        </div >
	);
}

export default Register;
