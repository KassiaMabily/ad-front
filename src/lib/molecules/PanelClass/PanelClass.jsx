import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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


export default function PanelClass({ aulas, handleChange, expanded, nameCourse, finished }) {
    const classes = useStyles();

    console.log(aulas)
    const sideList = (aulas) => (
        <div>
            {
                aulas.length ? 
                <div className="header-side">
                    <CircularProgressbar color=" #28A745" className="progress" value={(parseFloat(finished.split('/')[0]) / parseFloat(finished.split('/')[1])) * 100} text={`${parseInt((finished.split('/')[0] / finished.split('/')[1]) * 100)}%`} />
                    <h3>{nameCourse}</h3>
                    <h6>{finished}</h6>
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
                                    <ListItem button key={`panel-${index}-listitem-${index2}`} style={{ cursor: unit.is_lock ? 'not-allowed' : 'pointer' }}>
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



  return (
    <div >
        {sideList(aulas)}
    </div>
  );
}
