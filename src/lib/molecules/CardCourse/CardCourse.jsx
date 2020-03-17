import React from 'react';
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './styles.css';

import Info from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
    paper: {
        height: 270,
        width: '100%',
        boxShadow: 'none',
    },
    img_course: {
        width: '100%',
        height: '70%',
        objectFit: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    }
}));

function CardCourse({ item_course, type, index, history }) {

    const classes = useStyles();

    const courseClick = async (value) => {

        history.push(`/${value}`);

    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
            <Paper className={`${classes.paper} card-curso`} onClick={ (value) => courseClick(item_course.slug) }>
                <img src={item_course.img_link} className={classes.img_course} alt={item_course.title} />
                <div className="info_course_ctnr">
                    <a href={type === 'offer' ? '/checkout/' + item_course.hash : '/course/' + item_course.hash}>
                        <div className="name_course">{item_course.title}</div>
                        <div className="name_producer">{item_course.producer.name}</div>
                    </a>
                    {
                        type === 'offer' ? null : <Info className="info" />
                    }
                </div>
            </Paper>
        </Grid>
    );
}

export default withRouter(CardCourse);