import React, { useCallback, useRef, useState, useEffect } from 'react'

import { COURSE_KEY, UNIT_KEY, getKey } from '../../services/auth';
import { setFinishedUnit, postComment, postReply, getUnit } from "../../../redux/actions/CourseActions";
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

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

function Aula({ current_unit, setFinishedUnit, getUnit, postComment, postReply }) {
    const classes = useStyles();

    console.log(current_unit)

    const [ comments, setComments ] = useState([]);
    const [ newComment, setNewComment  ] = useState('');
    const [ newReply, setNewReply ] = useState('');

    console.log(current_unit)
    
    const setViweded = async () => {
        const hash_course = getKey(COURSE_KEY);
        const hash_unit = getKey(UNIT_KEY);
        setFinishedUnit(hash_course, hash_unit)
        
        
        if( Object.keys(current_unit.currentNext).length !== 0 && current_unit.currentNext.unit.is_lock === false){
            localStorage.setItem(UNIT_KEY, current_unit.currentNext.unit.hash);
            getUnit(hash_course, current_unit.currentNext.unit.hash);
        }
        
    }

    const goPrevious = async () => {
        const hash_course = getKey(COURSE_KEY);
        if( Object.keys(current_unit.currentPrevious).length !== 0 && current_unit.currentPrevious.unit.is_lock === false){
            localStorage.setItem(UNIT_KEY, current_unit.currentPrevious.unit.hash);
            getUnit(hash_course, current_unit.currentPrevious.unit.hash);
        }

    }

    const goNext = async () => {
        const hash_course = getKey(COURSE_KEY);
        if( Object.keys(current_unit.currentNext).length !== 0 && current_unit.currentNext.unit.is_lock === false){
            localStorage.setItem(UNIT_KEY, current_unit.currentNext.unit.hash);
            getUnit(hash_course, current_unit.currentNext.unit.hash);
        }
        
    }

    
    const sendComment = async () => {
        const hash_course = getKey(COURSE_KEY);
        const hash_unit = getKey(UNIT_KEY);

        postComment(hash_course, hash_unit, { body: newComment }).then(console.log("Comentário enviado com sucesso"));
    }

    const sendReply = async (hash) => {
        postReply(hash, { body: newReply }).then(console.log("Comentário enviado com sucesso"));
    }

    const handleSubmitComment = async (e) => {
        if (e.key === "Enter") {
            sendComment();
            e.target.value = "";
        }
    }

    const handleSubmitReply = async (e, hash) => {
        if (e.key === "Enter") {
            sendReply(hash);
            e.target.value = "";
        }
    }

    if(current_unit.current !== undefined){

        return (
            
            // <div className={classes.root}>
            <Grid container spacing={0} justify="center" alignItems="center">

                <Grid container justify="center" style={{ backgroundColor: "#131313" }}>
                    <Grid xs={6} item className="btnNavigation">
                        <button onClick={goPrevious}>
                            <ArrowBackIosIcon style={{ color: current_unit.current.unit.finished ? "#DDD" : "#DDD2" }} />
                        </button>
                    </Grid>
                    <Grid xs={6} item className="btnNavigation">
                        <button onClick={goNext}>
                            <ArrowForwardIosIcon style={{ color: current_unit.current.unit.finished ? "#DDD" : "#DDD2" }} />
                        </button>
                    </Grid>
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
                    <Grid item xs={10} md={4} style={{ borderWidth: 1, padding: 30 }}>


                        <button onClick={setViweded} className={current_unit.current.unit.finished ? 'check' : 'nocheck'}>
                            <CheckCircle style={{ color: current_unit.current.unit.finished ? "#DDD" : "#DDD2" }} />
                            {current_unit.current.unit.finished ? 'Marcar como não concluída' : 'Marcar como concluída'}
                        </button>

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
                            { current_unit.current.unit.comments.map((comment, index) =>
                                <div style={{ marginBottom: 20}} className="containerComments" key={`box_comment_${index}`}>
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
                                        comments[index] && comments[index] !== undefined ? 
                                            (
                                                <div>
                                                    { comment.reply.length ? comment.reply.map((reply, index2) => 
                                                        
                                                            <div className="boxComment"  style={{ marginLeft: 50 }} key={`comment_${index2}`}>
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
                                                            onKeyPress={(e) => handleSubmitReply(e, comment.post.hash)} 
                                                            onChange={(e) => { setNewReply(e.target.value) } } 
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
                                            <button onClick={() => setComments({ ...comments, [index]: !comments[index] })} >
                                                
                                                <div className="boxReplies" style={{ marginLeft: 50, paddingTop: 10 }} >
                                                    {
                                                        comments[index] && comments[index] !== undefined ? <ExpandLess /> : <ExpandMore />
                                                    }
                                                    <div style={{ fontSize: 16, marginLeft: 10, flexDirection: 'row', display: 'flex' }}>
                                                        {comment.reply.length} resposta(s)
                                                    </div>
                                                </div>
                                                
                                            </button>

                                                
                                            </div>
                                            ) 
                                            : 
                                            (
                                                <div className="boxComment" style={{ marginLeft: 50 }}>

                                                    <input 
                                                        className='input' 
                                                        type="text" 
                                                        placeholder='Escreva um comentário...'  
                                                        style={{ borderColor: 'rgba(159, 167, 172, 0.253)', width: '100%' }}
                                                        onKeyPress={(e) => handleSubmitReply(e, comment.post.hash)}  
                                                        value={ newReply } 
                                                        onChange={(e) => setNewReply(e.target.value) } 
                                                    />
                                                </div>
                                            ) 
                                    }
                                    
                                </div>
                            ) }
                            <div className="boxComment">
                                <input 
                                    className='input' 
                                    type="text" 
                                    placeholder='Escreva um comentário...'  
                                    style={{ borderColor: 'rgba(159, 167, 172, 0.253)', width: '100%' }}
                                    onKeyPress={(e) => handleSubmitComment(e)}  
                                    value={ newComment } 
                                    onChange={(e) => setNewComment(e.target.value) } 
                                />
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
	bindActionCreators({ setFinishedUnit, postComment, postReply, getUnit }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Aula));
