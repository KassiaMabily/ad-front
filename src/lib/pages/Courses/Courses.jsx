import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";

import Navbar from "../../organisms/Navbar";
import ContainerCursos from "../../organisms/ContainerCourses"

import { getUser } from "../../../redux/actions/PerfilActions";
import { getUserCourses } from "../../../redux/actions/CourseActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

function Courses({ getUser, getUserCourses }){

    useEffect(() =>
    {
        async function listcourses() {
            await getUserCourses();
        }
        listcourses();
    }, [ getUserCourses ]);

    useEffect(() =>
    {
        async function userData() {
            await getUser();
        }
        userData();
    }, [ getUser ]);

    

    return (
        <div className="bgContainerHome" style={{ backgroundColor: '#F8F8FD' }}>
            <Navbar openMenu={false} nameCourse={'Meus Cursos'} />
            <ContainerCursos title="Meus Cursos" />
        </div >
    )

}

const mapStateToProps = state => ({
    courses: state.courseState.courses,
	perfil: state.perfilState.perfil
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUserCourses, getUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Courses));