import React, { useCallback, useRef, useState, useEffect } from 'react'

import { COURSE_KEY, UNIT_KEY, getKey } from '../../services/auth';
import { setFinishedUnit } from "../../../redux/actions/CourseActions";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CheckCircle from '@material-ui/icons/CheckCircle';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './aula.css'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 80,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


// function useHookWithRefCallback(course_hash, unit_hash) {
//     const ref = useRef(null);

//     const setVieweded = async (event) => {
//         await User.setFinishedLesson(course_hash, unit_hash, '');
//         window.location.reload();
//     }

//     const setRef = useCallback(node => {
//         if (ref.current) {
//             ref.current.removeEventListener("ended", setVieweded);
//         }
      
//         if (node) {
//             node.addEventListener("ended", setVieweded);
//         }
//         ref.current = node
//     }, [])
    
//     return [setRef]
// }

function Aula({ current_unit, setFinishedUnit, current_course_units }) {
    const classes = useStyles();

    const [ comments, setComments ] = useState([]);
    
    const setViweded = async () => {
        // await User.setFinishedLesson(hashCourse, currentUnit.hash, '');
        // window.location.reload();
        const hash_course = getKey(COURSE_KEY);
        const hash_unit = getKey(UNIT_KEY);
        setFinishedUnit(hash_course, hash_unit)
    }

    
    console.log(current_course_units);
    if(current_unit.current !== undefined){

        return (
            
            // <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">

                <Grid container justify="center" style={{ backgroundColor: "#131313" }}>
                    <Grid xs={6} item justify="center" alignItems="center" className="btnNavigation" />
                    <Grid xs={6} item justify="center" alignItems="center" className="btnNavigation" />
                    {
                        typeof current_unit.current.unit.video !== 'undefined' ?
                            <Grid xs={10} md={4} item >
                                {/* <Paper className={classes.paper}> */}
                                <video
                                    // ref={ref}
                                    controls
                                    style={{ maxWidth: 1080, width: '100%', maxHeight: 720 }}
                                    // className="video"
                                    src={current_unit.current.unit.video.url}
                                />
                                <h4 className="titleVideo">{current_unit.current.unit.title}</h4>
                                {/* </Paper> */}
                            </Grid>
                            : null
                    }
                    <Grid xs={10} md={4} style={{ borderWidth: 1, padding: 30 }}>


                        <buttom onClick={setViweded} className={current_unit.current.unit.finished ? 'check' : 'nocheck'}>
                            <CheckCircle style={{ color: current_unit.current.unit.finished ? "#DDD" : "#DDD2" }} />
                            {current_unit.current.unit.finished ? 'Marcar como não concluída' : 'Marcar como concluída'}

                        </buttom>

                    </Grid>
                </Grid>
                <Grid item xs={9} >

                    <p style={{ width: 600 }}>
                        {current_unit.current.unit.description}
                        {/* {currentUnit.video} */}
                    </p>
                </Grid>
                <Grid item xs={5} >
                {/* {currentUnit.comments[0].post.message } */}
                    {   
                        <div>
                            { current_unit.current.unit.comments ? current_unit.current.unit.comments.map((comment, index) =>
                                <div style={{ marginBottom: 20}} className="containerComments">
                                    <div className="boxComment">
                                        <Avatar alt={comment.post.author} key={index} src={comment.post.img_link}  />
                                        <div style={{ marginLeft: 10 }}>
                                            <div className="author">
                                                {comment.post.author}
                                            </div>
                                            <div className="datetime" style={{ fontSize: 12 }}>
                                                {comment.post.datetime}
                                            </div>
                                            <div className="message" style={{ fontSize: 16 }}>
                                                {comment.post.message}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        comments[index] && comments[index] != undefined ? 
                                            (
                                                <div>
                                                    { comment.reply.length ? comment.reply.map((reply, index2) => 
                                                        
                                                            <div className="boxComment"  style={{ marginLeft: 50 }} id={`comment_${index2}`}>
                                                                <Avatar alt={reply.author}  src={reply.img_link}  />
                                                                <div style={{ marginLeft: 10 }}>
                                                                    <div className="author">
                                                                        {reply.author}
                                                                    </div>
                                                                    <div className="datetime" style={{ fontSize: 12 }}>
                                                                        {reply.datetime}
                                                                    </div>
                                                                    <div className="message" style={{ fontSize: 16 }}>
                                                                        {reply.message}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null 
                                                    }
                                                    <div className="boxComment" style={{ marginLeft: 50 }}>
                                                        <input 
                                                            className='input' 
                                                            type="text" 
                                                            placeholder='Escreva uma resposta...' 
                                                            // onKeyPress={(e) => handleSubmitReply(e)} 
                                                            // value={ newReply } 
                                                            // onChange={(e) => {seyNewReply(e.target.value); setHashCurrentComment(comment.post.hash) } } 
                                                            style={{ borderColor: 'rgba(159, 167, 172, 0.253)', width: '100%' }} 
                                                        />
                                                    </div>
                                                </div> 
                                            )
                                        : null
                                    }
                                        


                                    {    
                                        comment.reply.length ? 
                                            (
                                            <div>
                                            <buttom onClick={() => setComments({ ...comments, [index]: !comments[index] })} >
                                                
                                                <div className="boxReplies" style={{ marginLeft: 50, paddingTop: 10 }} >
                                                    {
                                                        comments[index] && comments[index] != undefined ? <ExpandLess /> : <ExpandMore />
                                                    }
                                                    <div style={{ fontSize: 16, marginLeft: 10, flexDirection: 'row', display: 'flex' }}>
                                                        {comment.reply.length} resposta(s)
                                                    </div>
                                                </div>
                                                
                                            </buttom>

                                                
                                            </div>
                                            ) 
                                            : 
                                            (
                                                <div className="boxComment" style={{ marginLeft: 50 }}>
                                                    <input 
                                                        className='input' 
                                                        type="text" 
                                                        placeholder='Escreva uma resposta...' 
                                                        // onKeyPress={(e) => handleSubmitReply(e)} 
                                                        // onChange={(e) => {seyNewReply(e.target.value); setHashCurrentComment(comment.post.hash) } }
                                                        // style={{ borderColor: 'rgba(159, 167, 172, 0.253)', width: '100%' }} 
                                                    />
                                                </div>
                                            ) 
                                    }
                                    
                                </div>
                            ) : null }
                            <div className="boxComment">
                                <input className='input' type="text" placeholder='Escreva um comentário...'  style={{ borderColor: 'rgba(159, 167, 172, 0.253)', width: '100%' }} />
                            </div>
                        </div>
                    }
                </Grid>

            </Grid>
            // </div>
        );
    }
    return null;
}

const mapStateToProps = state => ({
    current_unit: state.courseState.current_unit,
    current_course_units: state.courseState.current_course_units,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setFinishedUnit }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Aula));
