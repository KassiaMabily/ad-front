import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import PanelClass from './../../molecules/PanelClass';

function DrawerComponent({ left, current_course_units, setShowMenu }) {
  if(current_course_units.aulas !== undefined){
    return (
      <div >
        <Drawer open={left} onClose={() => setShowMenu(false)}>
          <PanelClass 
            aulas={current_course_units.aulas} 
            nameCourse={"ADGROUP"} 
            finished={current_course_units.finished} 
            slug_course={current_course_units.slugCourse}
          />
        </Drawer>
      </div>
    );
  }
  return null
}

const mapStateToProps = state => ({
  current_course_units: state.courseState.current_course_units,
})

export default connect(mapStateToProps)(DrawerComponent);
