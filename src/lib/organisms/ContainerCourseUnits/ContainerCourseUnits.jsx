import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PanelClass from '../../molecules/PanelClass';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20,
        marginTop: 80,
        padding: theme.spacing(2),
    },
    paper: {
        textAlign: 'center',
    },
    img_course: {
        width: '100%',
        height: '70%',
        objectFit: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    }
}));

function ContainerCourseUnits({ title, current_course_units }) {
    const classes = useStyles();
    if(current_course_units.aulas !== undefined){
        return (
            <div className={classes.root}>
                <h1>{title}</h1>
                <Grid container spacing={3} >
                    <Grid item xs={1} sm={1} md={2} lg={3}>
                        <Paper className={classes.paper}></Paper>
                    </Grid>
                    <Grid item xs={12} sm={10} md={8} lg={6}>
                        <Paper className={classes.paper}>
                            <PanelClass aulas={current_course_units.aulas} nameCourse={title} finished={current_course_units.finished} />
                        </Paper>
                    </Grid>
                    <Grid item xs={1} sm={1} md={2} lg={3}>
                        <Paper className={classes.paper}></Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return null;
}

const mapStateToProps = state => ({
    current_course_units: state.courseState.current_course_units,
})

export default connect(mapStateToProps)(ContainerCourseUnits);