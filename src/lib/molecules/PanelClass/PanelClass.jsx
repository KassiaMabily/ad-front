import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UNIT_KEY } from '../../services/auth';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircle from '@material-ui/icons/CheckCircle';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import './sideBar.css'


const useStyles = makeStyles(theme => ({
    list: {
        width: "100%",
    },
    fullList: {
        width: 'auto',
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: "left"
    },
}));


function PanelClass({ history, slug_course, type, current_course_units }) {
    const classes = useStyles();


    console.log("PanelClass")
    console.log(current_course_units)

    const unitClick = async (modulo, unit) => {
        if(!unit.is_lock){
            localStorage.setItem(UNIT_KEY, unit.hash);
            if(type === "sidebar"){
                window.location.pathname = window.location.pathname.split('/').slice(0,-1).join('/') + "/" +unit.slug;
            }else{
                history.push({ pathname: `${current_course_units.slugCourse}/${modulo.slug}/${unit.slug}` })
            }
            
        }
    }

    

    const sideList = (aulas, finished_aux) => (
        <div>
            {
                aulas.length ? 
                <div className="header-side">
                    <CircularProgressbar color=" #28A745" className="progress" value={(parseFloat(finished_aux.split('/')[0]) / parseFloat(finished_aux.split('/')[1])) * 100} text={`${parseInt((finished_aux.split('/')[0] / finished_aux.split('/')[1]) * 100)}%`} />
                    <h3>{current_course_units.nameCourse}</h3>
                    <h6>{finished_aux}</h6>
                </div> 
                : null
            }


            {aulas.map((item, index) => (
                <ExpansionPanel key={`expansion-panel-${index}`}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                        key={`expansion-panel-summary-${index}`}
                    >    
                        {item.finished ? <CheckCircle style={{ color: '#28A745', paddingRight: 20 }} /> : <CheckCircle style={{ color: '#DDD', paddingRight: 20 }} />}      
                        <Typography className={classes.heading}>
                            {item.title}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails key={`expansion-panel-details-${index}`}>
                        <List>
                            {item.units.map((unit, index2) => {
                                return (
                                    <ListItem onClick={() => unitClick(item, unit)} button key={`panel-${index}-listitem-${index2}`} style={{ cursor: unit.is_lock ? 'not-allowed' : 'pointer' }}>
                                        <ListItemIcon> 
                                            {
                                                unit.finished ? 
                                                    <CheckCircle /> 
                                                : 
                                                    unit.is_lock === true ? 
                                                        <LockOutlinedIcon /> 
                                                        : 
                                                        <LockOpenOutlinedIcon />  
                                            }
                                        </ListItemIcon>
                                        <ListItemText primary={unit.title} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}

        </div>
    );


    if(current_course_units.aulas !== undefined){
        return (
            <div >
                {sideList(current_course_units.aulas, current_course_units.finished)}
            </div>
        );
    }
    
    return null;
}

const mapStateToProps = state => ({
    current_course_units: state.courseState.current_course_units,
})
  
export default connect(mapStateToProps)(withRouter(PanelClass));