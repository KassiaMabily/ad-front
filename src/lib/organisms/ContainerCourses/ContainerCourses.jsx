import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import * as courseActions from "../../../redux/actions/CourseActions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import CardCourse from '../../molecules/CardCourse';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20,
        marginTop: 80,
        padding: theme.spacing(2),
    },
    paper: {
        height: 270,
        width: '90%',
        boxShadow: 'none'
    },
    control: {
        // padding: theme.spacing(2),
    },
    img_course: {
        width: '100%',
        height: '70%',
        objectFit: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    }
}));

function ContainerCourses({ courses, getUserCourses, title }) {

    useEffect(() =>
    {
        async function listcourses() {
            await getUserCourses();
        }
        listcourses();
    }, [ getUserCourses ]);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>{title}</h1>
            <Grid container spacing={3} justify="flex-start" alignItems="center" >

                {courses.map((item, index) => (
                    <CardCourse item_course={item} type="course" index={index} key={`container_card_${index}`} />
                ))}

            </Grid>

        </div>
    );
}

const mapStateToProps = state => ({
    courses: state.courseState.courses,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(courseActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContainerCourses);