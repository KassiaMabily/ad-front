import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";

import Navbar from "../../organisms/Navbar";
import ContainerCursos from "../../organisms/ContainerCourses"

import { setLoading } from "../../../redux/actions/AuxActions";
import { getUser } from "../../../redux/actions/PerfilActions";
import { getUserCourses } from "../../../redux/actions/CourseActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

function Courses({ getUser, getUserCourses, setLoading }){

    useEffect(() => {
        async function fetchUrl() {
            setLoading(true);
            await getUserCourses()
            await getUser();
            setLoading(false);
        }
        fetchUrl();
    }, [setLoading, getUserCourses, getUser]);

    return (
        <div className="bgContainerHome" style={{ backgroundColor: '#F8F8FD' }}>
            <Navbar openMenu={false} nameCourse={'Meus Cursos'} />
            <ContainerCursos title="Meus Cursos" />
        </div >
    )

}

const mapStateToProps = state => ({
    courses: state.courseState.courses,
    perfil: state.perfilState.perfil,
    is_loading: state.loadingState.is_loading,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUserCourses, getUser, setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Courses));