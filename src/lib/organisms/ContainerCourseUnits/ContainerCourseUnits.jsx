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
    paper_card: {
        height: 290,
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

function ContainerCourseUnits({ title, current_course_units }) {
    const classes = useStyles();

    if(current_course_units.aulas !== undefined){
        return (
            <div className={classes.root}>
                
                <Grid container spacing={6} >
                    <Grid item md={1} lg={1} />
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <h2 style={{ margin: 0}} >{title}</h2>
                        <Paper className={`${classes.paper_card} card-curso`} >
                            <img src={current_course_units.img_link} className={classes.img_course} alt={current_course_units.nameCourse} />
                            <div className="info_course_ctnr">
                                <div>
                                    <div className="name_producer"><strong>Produtor:</strong> {current_course_units.producer}</div>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Paper className={classes.paper}>
                            <PanelClass />
                        </Paper>
                    </Grid>
                    <Grid item md={1} lg={1} />
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