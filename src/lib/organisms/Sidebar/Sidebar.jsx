import React, { useEffect } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';
import { UNIT_KEY, MODULO_KEY, COURSE_KEY, getKey } from '../../services/auth';
import { bindActionCreators } from 'redux';
import { getUserCourseUnits } from "../../../redux/actions/CourseActions";
import { withRouter } from "react-router-dom";

import PanelClass from './../../molecules/PanelClass';

import "./index.css";

function DrawerComponent({ left, current_course_units, setShowMenu, getUserCourseUnits }) {

  useEffect(() => {
    async function fetchUrl() {
        const hash = getKey(COURSE_KEY);
        await getUserCourseUnits(hash);
    }
    fetchUrl();
}, [ getUserCourseUnits]);

  if(current_course_units.aulas !== undefined){
    return (
      <div >
        <Drawer open={left} onClose={() => setShowMenu(false)} className="drawerComponent">
          <PanelClass 
            aulas={current_course_units.aulas} 
            nameCourse={"ADGROUP"} 
            finished={current_course_units.finished} 
            slug_course={current_course_units.slugCourse}
            type={"sidebar"}
          />
        </Drawer>
      </div>
    );
  }
  return null
}


const mapStateToProps = state => ({
  current_course_units: state.courseState.current_course_units,
});

const mapDispatchToProps = dispatch =>
bindActionCreators({ getUserCourseUnits }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DrawerComponent));
