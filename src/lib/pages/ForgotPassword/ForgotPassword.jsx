import React from "react";
import PasswordForgotForm from '../../molecules/Forms/PasswordForgotForm';

function PasswordForgot() {
    
	return (
		<div className="bgContainerLogin">
            <div className="LoginContainerBack" />
			<PasswordForgotForm />
            <div className='slogan_footer'>
                2020 © powered by 4Rockets
            </div>
        </div >
	);
}

export default PasswordForgot;
