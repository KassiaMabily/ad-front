import React, { useCallback, useRef, useEffect } from 'react'

import { COURSE_KEY, UNIT_KEY, getKey, NEXT_UNIT_KEY } from '../../services/auth';
import { setFinishedUnit, postComment, postReply, getUnit } from "../../../redux/actions/CourseActions";
import { setLoading } from "../../../redux/actions/AuxActions";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import CheckCircle from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import IconButton from '@material-ui/core/IconButton';
import { getUser } from "../../../redux/actions/PerfilActions";
import DescriptionIcon from '@material-ui/icons/Description';
import string_to_slug from '../../assets/Functions';

import './aula.css'
import { Typography } from '@material-ui/core';

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
    margin: {
        margin: theme.spacing(1),
    },
}));


function useHookWithRefCallback(getUnit, setFinishedUnit, setLoading) {
    const ref = useRef(null);

    const setRef = useCallback(node => {
        const setViweded = async () => {
            setLoading(true);
            const hash_course = getKey(COURSE_KEY);
            const hash_unit = getKey(UNIT_KEY);
            const next_unit = JSON.parse(getKey(NEXT_UNIT_KEY));
    
            setFinishedUnit(hash_course, hash_unit, 'video')
    
            if(Object.keys(next_unit).length !== 0){
                getUnit(hash_course, next_unit.hash);
    
                localStorage.setItem(UNIT_KEY, next_unit.hash);
    
                window.location.pathname = window.location.pathname.split('/').slice(0,-1).join('/') + "/" +next_unit.slug;
                setLoading(false);
            }
            setLoading(false);
        }

        if (ref.current) {
            ref.current.removeEventListener("ended", setViweded);
        }
      
        if (node) {
            node.addEventListener("ended", setViweded);
        }
        ref.current = node
    }, [setFinishedUnit, getUnit, setLoading])
    
    return [setRef]
}

function Aula({ history, current_unit, setFinishedUnit, getUnit, postComment, postReply, perfil, getUser, setLoading }) {
    const classes = useStyles();

    const [ ref ] = useHookWithRefCallback( getUnit, setFinishedUnit, setLoading );

    useEffect(() =>
    {
        async function userData() {
            setLoading(true)
            await getUser();
            setLoading(false);
        }
        userData();
    }, [ setLoading, getUser ]);
    
    const setViweded = async () => {
        setLoading(true);
        const hash_course = getKey(COURSE_KEY);
        const hash_unit = getKey(UNIT_KEY);
        setFinishedUnit(hash_course, hash_unit, 'button')
        
        if( Object.keys(current_unit.currentNext).length !== 0 && current_unit.currentNext.unit.is_lock === false){
            localStorage.setItem(UNIT_KEY, current_unit.currentNext.unit.hash);
            getUnit(hash_course, current_unit.currentNext.unit.hash);
            setLoading(false);
            let slug = string_to_slug(current_unit.currentNext.unit.title)
            window.location.pathname = window.location.pathname.split('/').slice(0,-1).join('/') + "/" +slug;
        }else{
            setLoading(false);
        }
        
    }

    const goPrevious = async () => {
        const hash_course = getKey(COURSE_KEY);
        if( Object.keys(current_unit.currentPrevious).length !== 0 && current_unit.currentPrevious.unit.is_lock === false){
            localStorage.setItem(UNIT_KEY, current_unit.currentPrevious.unit.hash);
            
            getUnit(hash_course, current_unit.currentPrevious.unit.hash);

            let slug = string_to_slug(current_unit.currentPrevious.unit.title)
            window.location.pathname = window.location.pathname.split('/').slice(0,-1).join('/') + "/" +slug;
        }

    }

    const goNext = async () => {
        const hash_course = getKey(COURSE_KEY);
        if( Object.keys(current_unit.currentNext).length !== 0 && current_unit.currentNext.unit.is_lock === false){
            localStorage.setItem(UNIT_KEY, current_unit.currentNext.unit.hash);
            getUnit(hash_course, current_unit.currentNext.unit.hash);

            let slug = string_to_slug(current_unit.currentNext.unit.title)
            window.location.pathname = window.location.pathname.split('/').slice(0,-1).join('/') + "/" +slug;
        }
        
    }
    
    if(current_unit.current !== undefined){

        if( Object.keys(current_unit.currentNext).length !== 0 && current_unit.currentNext.unit.is_lock === false){
            localStorage.setItem(NEXT_UNIT_KEY, JSON.stringify({ hash: current_unit.currentNext.unit.hash,  slug: string_to_slug(current_unit.currentNext.unit.title)}));
        }else{
            localStorage.setItem(NEXT_UNIT_KEY, JSON.stringify({}));
        }

        const has_next = Object.keys(current_unit.currentNext).length !== 0 && current_unit.currentNext.unit.is_lock === false ? true : false;
        const has_prev = Object.keys(current_unit.currentPrevious).length !== 0 && current_unit.currentPrevious.unit.is_lock === false ? true : false;
        let url_help = `https://api.whatsapp.com/send?phone=5527999299076&text=Olá me chamo ${perfil.name} e estou com uma dúvida na aula de ${current_unit.current.unit.title}` 
        return (
            <Grid container spacing={0} justify="center" alignItems="center">
                <Grid item lg={6} md={6} xs={6} className="gridNavigation" style={{ textAlign: 'left', cursor: has_prev ? 'pointer' : 'not-allowed' }} onClick={goPrevious}>
                    <IconButton aria-label="delete" className={classes.margin} disabled={!has_prev} >
                        <ArrowBackIosIcon fontSize="large" style={{ color: 'white' }} />
                        <Typography style={{ color: 'white' }} >Anterior</Typography>
                    </IconButton>
                </Grid>
                <Grid item lg={6} md={6} xs={6} className="gridNavigation" style={{ textAlign: 'right', cursor: has_next ? 'pointer' : 'not-allowed' }} onClick={goNext}>
                    <IconButton aria-label="delete" className={classes.margin}  disabled={!has_prev} >
                        <Typography style={{ color: 'white' }} >Próximo</Typography>
                        <ArrowForwardIosIcon fontSize="large" style={{ color: 'white' }}/>  
                    </IconButton>
                </Grid>



                <Grid item lg={12} md={12} xs={12} className="gridVideo" >
                    {
                        typeof current_unit.current.unit.video !== 'undefined' ?
                            <video
                                ref={ref}
                                controls
                                controlsList="nodownload"
                                style={{ maxWidth: 1080, width: '100%', maxHeight: 720 }}
                                src={current_unit.current.unit.video.url}
                            />
                        :
                            null
                    }
                </Grid>


                <Grid item lg={1} xs={1}/>
                <Grid item lg={10}  md={12} sm={12} xs={10} className={'gridClassTitle'} >
                    <h3 className="titleVideo">Aula de {current_unit.current.unit.title}</h3>
                </Grid>
                <Grid item lg={1} xs={1}/>

                {
                    current_unit.current.unit.description !== null ? 
                        <div>
                        <Grid item lg={1} xs={1}/>
                        <Grid item lg={10} xs={10}>
                            {current_unit.current.unit.description}
                        </Grid>
                        <Grid item lg={1} xs={1}/>
                        </div>
                    : null
                }

                <Grid item lg={1} md={1} sm={1} />
                <Grid item lg={5} md={5} sm={5} xs={12} className="gridButtons">
                { current_unit.current.unit.files.length > 0 ? <Typography>Leitura complementar</Typography> : null }
                { current_unit.current.unit.files.length > 0 ? current_unit.current.unit.files.map((file, index) =>                 

                    <a href = {file.url} target = "_blank"  rel="noopener noreferrer"  key={`file_${index}`} style={{ textDecoration: 'none', color: '#DDD2' }}>
                        <button className={'linkFiles'}>
                            <DescriptionIcon style={{ marginRight: 20 }} />
                            { file.name }
                        </button>
                    </a>

                    ) : null 
                }
                </Grid>
                <Grid item lg={5} md={5} sm={5} xs={12} className="gridButtons">
                    <button onClick={setViweded} className={current_unit.current.unit.finished ? 'buttonClass check' : 'buttonClass nocheck'}>
                        <CheckCircle style={{  marginRight: 20, color: current_unit.current.unit.finished ? "#000" : "#000" }} />
                        {current_unit.current.unit.finished ? 'Marcar como não concluída' : 'Marcar como concluída'}
                    </button>
                    <a href={url_help} target = "_blank"  rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#DDD2' }}>
                        <button className={'buttonClass'}>
                            <WhatsAppIcon style={{ marginRight: 20 }} />
                            Entre em contato com o professor
                        </button>
                    </a>
                </Grid>
                <Grid item lg={1} md={1} sm={1} />
            </Grid>
            
        );
    }
    
    return null;
}

const mapStateToProps = state => ({
    current_unit: state.courseState.current_unit,
    current_course_units: state.courseState.current_course_units,
    perfil: state.perfilState.perfil,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ setFinishedUnit, postComment, postReply, getUnit, getUser, setLoading }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Aula));
