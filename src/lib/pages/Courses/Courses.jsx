import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";

import Navbar from "../../organisms/Navbar";
import ContainerCursos from "../../organisms/ContainerCourses"
import { isAuthenticated } from "../../services/auth";

function Courses({ history }){

    // Impede o usuário de voltar a página de Login
    useEffect(()=>{
        if(isAuthenticated()) {
            window.addEventListener("popstate", () => {
                history.go(1);
            });
        }
    }, []);

    

    return (
        <div className="bgContainerHome" style={{ backgroundColor: '#F8F8FD' }}>
            <Navbar openMenu={false} nameCourse={'Meus Cursos'} />
            <ContainerCursos title="Meus Cursos" />
        </div >
    )

}

export default withRouter(Courses);