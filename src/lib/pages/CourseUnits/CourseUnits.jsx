import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from "../../organisms/Navbar";

import { getUserCourseUnits } from "../../../redux/actions/CourseActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import ContainerCourseUnits from '../../organisms/ContainerCourseUnits';

function CourseUnits({ history, getUserCourseUnits }){

    const { nameCourse, hashCourse } = history.location.state;

    useEffect(() =>
    {
        async function listcourseunits(hashCourse) {
            await getUserCourseUnits(hashCourse);
        }
        listcourseunits(hashCourse);
    }, [ getUserCourseUnits, hashCourse ]);

    return (
        <div className="bgContainerHome" style={{ backgroundColor: '#F8F8FD' }}>
            <Navbar openMenu={false} nameCourse={nameCourse} />
            <ContainerCourseUnits title={nameCourse} />
        </div >
    )

}

const mapStateToProps = state => ({
    current_course_units: state.courseState.courses,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUserCourseUnits }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUnits));