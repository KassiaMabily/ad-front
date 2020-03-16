import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PlayArrow from '@material-ui/icons/PlayArrow';
import CheckCircle from '@material-ui/icons/CheckCircle';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Typography from '@material-ui/core/Typography';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './sideBar.css'



const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .01)',
    borderBottom: '1px solid  #FCB41A',
    borderTop: '1px solid  #FCB41A',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelSummarySelected = withStyles({
  root: {
    backgroundColor: '#F8F8FD',
    border: '1px solid #FCB41A',
    borderLeft: '7px solid #FCB41A',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);


const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
});


export default function TemporaryDrawer({ left, toggleDrawer, aulas, handleChange, expanded, nameCourse, finished, currentUnitId }) {
  const classes = useStyles();

  console.log(aulas);
  // console.log(aulas2);
  const sideList = (aulas) => (
    <div
      className={classes.list}
      role="presentation"
    >
      {
        aulas.length ? <div className="header-side">
          <CircularProgressbar color=" #FCB41A" className="progress" value={(parseFloat(finished.split('/')[0]) / parseFloat(finished.split('/')[1])) * 100} text={`${parseInt((finished.split('/')[0] / finished.split('/')[1]) * 100)}%`} />
          <h3>{nameCourse}</h3>
          <h6>{finished}</h6>
        </div> : null
      }


      {aulas.map((item, index) => (
        <ExpansionPanel square
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >

          {
            expanded === item.id ?
              <ExpansionPanelSummarySelected aria-controls="panel1d-content" id="panel1d-header">
                <ListItemIcon> {item.finished ? <CheckCircle /> : null}</ListItemIcon>
                <Typography className="module-title">{item.title}</Typography>
              </ExpansionPanelSummarySelected>
              :
              <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
      
                <ListItemIcon> {item.finished ? <CheckCircle /> : null }</ListItemIcon>
                <p className="module-title">{item.title}</p>
              </ExpansionPanelSummary>
          }

          <ExpansionPanelDetails>
            <List>
              {item.units.map((unit, index) => {
                console.debug('UNIDADE ATUAL',currentUnitId)
                return (
                  <ListItem button onClick={toggleDrawer('left', false, unit, unit.is_lock)} key={index} style={{ cursor: unit.is_lock ? 'not-allowed' : 'pointer' }}>
                    {/* <ListItemIcon><PlayArrow /></ListItemIcon> */}
                    <ListItemIcon> {unit.finished ? <CheckCircle /> : unit.is_lock == true ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />  }</ListItemIcon>
                    <ListItemText primary={unit.title} />
                  </ListItem>
                )
              }
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

    </div >
  );



  return (
    <div >
      <Drawer open={left} onClose={toggleDrawer('left', false)}>
        {sideList(aulas)}
      </Drawer>
    </div>
  );
}
