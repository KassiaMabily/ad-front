import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from "../../organisms/Navbar";

import { getUserCourseUnits } from "../../../redux/actions/CourseActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import ContainerCourseUnits from '../../organisms/ContainerCourseUnits';
import { COURSE_KEY, getKey } from '../../services/auth';

function CourseUnits({ current_course_units, getUserCourseUnits }){
    
    useEffect(() =>
    {
        async function listcourseunits() {
            const hash = getKey(COURSE_KEY);
            await getUserCourseUnits(hash);
        }
        listcourseunits();
    }, [ getUserCourseUnits ]);
    

    return (
        <div className="bgContainerHome" style={{ backgroundColor: '#F8F8FD' }}>
            <Navbar openMenu={false} nameCourse={"ADGROUP"} />
            <ContainerCourseUnits title={current_course_units.nameCourse} />
        </div >
    )

}

const mapStateToProps = state => ({
    current_course_units: state.courseState.current_course_units,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUserCourseUnits }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUnits));