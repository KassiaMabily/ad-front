import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Navbar from "../../organisms/Navbar";

import { getUnit, getUserCourseUnits } from "../../../redux/actions/CourseActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Aula from "../../organisms/Aula";

import { COURSE_KEY, UNIT_KEY, getKey } from '../../services/auth';

function CourseUnitClass({ current_unit, getUnit, getUserCourseUnits }){

    console.log(current_unit);

    useEffect(() =>
    {
        async function get_unit() {
            const hash_course = getKey(COURSE_KEY);
            const hash_unit = getKey(UNIT_KEY);
            await getUserCourseUnits(hash_course);
            await getUnit(hash_course, hash_unit);
        }
        get_unit();
    }, [ getUnit ]);
    

    return (
        <div className="bgContainerHome" style={{ backgroundColor: '#F8F8FD' }}>
            <Navbar openMenu={false} nameCourse={"ADGROUP"} />

            <Aula />
            
        </div >
    )

}

const mapStateToProps = state => ({
    current_unit: state.courseState.current_unit,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUnit, getUserCourseUnits }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseUnitClass));