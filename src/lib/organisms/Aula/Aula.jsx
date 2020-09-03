import React, { useCallback, useRef, useEffect, useState } from "react";
import TagManager from "react-gtm-module";

import {
  COURSE_KEY,
  MODULO_KEY,
  UNIT_KEY,
  getKey,
  NEXT_UNIT_KEY,
} from "../../services/auth";
import {
  setFinishedUnit,
  postComment,
  postReply,
  getUnit,
  getUserCourseUnits,
} from "../../../redux/actions/CourseActions";
import { setLoading } from "../../../redux/actions/AuxActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Player from "../../molecules/PlayerStream/PlayerStream";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";
import { getUser } from "../../../redux/actions/PerfilActions";
import { CloudDownload } from "@material-ui/icons";
import string_to_slug from "../../assets/Functions";
import YouTube from "react-youtube";

import "./aula.css";
import { Typography } from "@material-ui/core";

import Timer from "./Timer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

// function useHookWithRefCallback(
//   getUnit,
//   setFinishedUnit,
//   setLoading,
//   getUserCourseUnits
// ) {
//   const ref = useRef(null);

//   const setRef = useCallback(
//     (node) => {
//       const setViweded = async () => {
//         setLoading(true);
//         const hash_course = getKey(COURSE_KEY);
//         const hash_unit = getKey(UNIT_KEY);
//         const next_unit = JSON.parse(getKey(NEXT_UNIT_KEY));
//         const hash_modulo = getKey(MODULO_KEY);
//         setFinishedUnit(hash_course, hash_modulo, hash_unit, "video")
//           .then((_) => {
//             getUserCourseUnits(hash_course);
//             setLoading(false);
//             if (Object.keys(next_unit).length !== 0) {
//               getUnit(hash_course, next_unit.hash);
//               localStorage.setItem(UNIT_KEY, next_unit.hash);
//               window.location.pathname =
//                 window.location.pathname.split("/").slice(0, -1).join("/") +
//                 "/" +
//                 next_unit.slug;
//             }
//           })
//           .catch((error) => {
//             setLoading(false);
//           });
//       };

//       if (ref.current) {
//         ref.current.removeEventListener("ended", setViweded);
//       }

//       if (node) {
//         node.addEventListener("ended", setViweded);
//       }
//       ref.current = node;
//     },
//     [setFinishedUnit, getUnit, setLoading, getUserCourseUnits]
//   );

//   return [setRef];
// }

function Aula({
  history,
  current_unit,
  setFinishedUnit,
  getUnit,
  postComment,
  postReply,
  perfil,
  getUser,
  setLoading,
  getUserCourseUnits,
}) {
  const classes = useStyles();
  const [timerCurrent, setTimerCurrent] = useState(
    current_unit.video.release_datetime
  );

  const [showAlert, setShowAlert] = useState(false);
  // current_unit.current.unit.video.datetime_release

  const [timerString, setTimerStrig] = useState("");
  // const [showTimer, setShowTimer] = useState(false);

  // const [ref] = useHookWithRefCallback(
  //   getUnit,
  //   setFinishedUnit,
  //   setLoading,
  //   getUserCourseUnits
  // );

  useEffect(() => {
    async function userData() {
      setLoading(true);
      await getUser();
    }
    userData();
  }, [setLoading, getUser]);

  //função para setar a aula como vizualizada
  const setViweded = async () => {
    setLoading(true);
    // alert('ESTA OPÇÃO ESTARÁ DISPONÍVEL ÀS 20:30hs\n Atualização Em andamento.')
    // setLoading(false);
    // return

    const hash_course = getKey(COURSE_KEY);
    const hash_modulo = getKey(MODULO_KEY);
    const hash_unit = getKey(UNIT_KEY);
    setFinishedUnit(hash_course, hash_modulo, hash_unit, "button").then(
      async (_) => {
        getUserCourseUnits(hash_course);
        setLoading(false);
        if (!current_unit.finished) {
          setShowAlert(true);
          await TagManager.dataLayer({
            dataLayer: {
              event: "aula_concluida",
            },
          });
        } else {
          alert("Tudo pronto para você rever essa aula.");
          window.location.reload();
        }
        // goNext();
      }
    );
  };

  //função para ir para a aula anterior
  const goPrevious = async () => {
    setLoading(true);
    alert(
      "Esta opção não está disponível no momento selecione no menu ao lado."
    );
    setLoading(false);
    return;
    const hash_course = getKey(COURSE_KEY);
    if (
      Object.keys(current_unit.currentPrevious).length !== 0 &&
      current_unit.currentPrevious.unit.is_lock === false
    ) {
      localStorage.setItem(
        MODULO_KEY,
        current_unit.currentPrevious.hash_module
      );
      localStorage.setItem(UNIT_KEY, current_unit.currentPrevious.unit.hash);

      getUnit(hash_course, current_unit.currentPrevious.unit.hash);

      let slug = string_to_slug(current_unit.currentPrevious.unit.title);
      window.location.pathname =
        window.location.pathname.split("/").slice(0, -1).join("/") + "/" + slug;
    }
  };

  //função para avançar para a próxima aula
  const goNext = async () => {
    setLoading(true);
    alert(
      "Esta opção não está disponível no momento selecione no menu ao lado."
    );
    setLoading(false);
    return;
    const hash_course = getKey(COURSE_KEY);
    if (
      Object.keys(current_unit.currentNext).length !== 0 &&
      current_unit.currentNext.unit.is_lock === false
    ) {
      localStorage.setItem(MODULO_KEY, current_unit.currentNext.hash_module);
      localStorage.setItem(UNIT_KEY, current_unit.currentNext.unit.hash);
      getUnit(hash_course, current_unit.currentNext.unit.hash);

      let slug = string_to_slug(current_unit.currentNext.unit.title);
      window.location.pathname =
        window.location.pathname.split("/").slice(0, -1).join("/") + "/" + slug;
    }
  };

  const x = setInterval(() => {
    // console.log(current_unit.current.unit.video.description)
    // Get today's date and time
    const now = new Date();
    const time = new Date(timerCurrent);

    // Find the distance between now and the count down date
    var distance = time.getTime() - now.getTime();

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    const stringTime =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // this.setState({ timerStrig: stringTime });
    setTimerStrig(stringTime);
    // console.log(current_unit.current.unit.video.description)
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);

  const ALERT_VIEWDED = ({ showAlert, title, text, buttonAction }) => {
    if (showAlert) {
      return (
        <div className="backdrop-loading">
          <div className="box-alert">
            <div>
              <h1>{title}</h1>
              <p>{text}</p>
            </div>

            <div className="box-btns">
              <button className="button-alert" onClick={() => buttonAction()}>
                Ok, próxima.
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (current_unit !== undefined) {
    setLoading(false);
    // if (
    //   Object.keys(current_unit.currentNext).length !== 0 &&
    //   current_unit.currentNext.unit.is_lock === false
    // ) {
    //   localStorage.setItem(
    //     NEXT_UNIT_KEY,
    //     JSON.stringify({
    //       hash: current_unit.currentNext.unit.hash,
    //       slug: string_to_slug(current_unit.currentNext.unit.title),
    //     })
    //   );
    // } else {
    //   localStorage.setItem(NEXT_UNIT_KEY, JSON.stringify({}));
    // }

    // const has_next =
    //   Object.keys(current_unit.currentNext).length !== 0 &&
    //   current_unit.currentNext.unit.is_lock === false
    //     ? true
    //     : false;
    // const has_prev =
    //   Object.keys(current_unit.currentPrevious).length !== 0 &&
    //   current_unit.currentPrevious.unit.is_lock === false
    //     ? true
    //     : false;
    let url_help = `https://api.whatsapp.com/send?phone=+5527988547444&text=Olá me chamo ${perfil.name}. Vim pela aula de ${current_unit.title}`;

    if (current_unit.video.is_timer) {
      return (
        <div>
          <Timer
            string_timer={timerString}
            tubnaill={current_unit.video.tubnaill}
          />
        </div>
      );
    } else {
      return (
        <div>
          <ALERT_VIEWDED
            showAlert={showAlert}
            title="Parabéns!"
            text="Meu nobre!! Mais uma aula concluída com sucesso. Mas não pare, seu progresso depende da sua consistência."
            buttonAction={() => setShowAlert(false)}
          />
          <Grid container spacing={0} justify="center" alignItems="center">
            <Grid
              item
              lg={6}
              md={6}
              xs={6}
              className="gridNavigation"
              style={{
                textAlign: "left",
                // cursor: has_prev ? "pointer" : "not-allowed",
              }}
              // onClick={goPrevious}
            >
              <IconButton
                aria-label="delete"
                className={classes.margin}
                // disabled={!has_prev}
              >
                <ArrowBackIosIcon fontSize="large" style={{ color: "white" }} />
                <Typography style={{ color: "white" }}>Anterior</Typography>
              </IconButton>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              xs={6}
              className="gridNavigation"
              style={{
                textAlign: "right",
                // cursor: has_next ? "pointer" : "not-allowed",
              }}
              // onClick={goNext}
            >
              <IconButton
                aria-label="delete"
                className={classes.margin}
                // disabled={!has_prev}
              >
                <Typography style={{ color: "white" }}>Próximo</Typography>
                <ArrowForwardIosIcon
                  fontSize="large"
                  style={{ color: "white" }}
                />
              </IconButton>
            </Grid>

            <Grid container style={{ backgroundColor: "#111" }}>
              {typeof current_unit.video !== "undefined" ? (
                current_unit.video.type === "application/x-mpegURL" ? (
                  <div className="gridVideo">
                    <Player
                      autoplay
                      controls
                      sources={[
                        {
                          src: current_unit.video.url,
                          type: "application/x-mpegURL",
                        },
                      ]}
                    />
                  </div>
                ) : (
                  // <div className="gridVideo">
                  <YouTube
                    videoId={current_unit.video.url}
                    onEnd={setViweded}
                    className="YouTube"
                  />
                  // </div>
                )
              ) : null}

              {/* <AdPlayer unit_video={current_unit.current.unit.video} /> */}

              <Grid item xs={12} md={4} lg={3}>
                <button
                  onClick={setViweded}
                  className={
                    current_unit.finished
                      ? "buttonClass check"
                      : "buttonClass nocheck"
                  }
                >
                  <CheckCircle
                    style={{
                      marginRight: 10,
                      color: current_unit.finished ? "#FDFDFD" : "#FDFDFD",
                    }}
                  />
                  {current_unit.finished
                    ? "Marcar como não concluída"
                    : "Marcar como concluída"}
                </button>
                <a
                  href={url_help}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#DDD2" }}
                >
                  <button className={"buttonClass"}>
                    <WhatsAppIcon style={{ marginRight: 10 }} />
                    Falar com o professor
                  </button>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            {/* <Grid item lg={1} xs={1}/> */}
            <Grid
              item
              lg={10}
              md={12}
              sm={12}
              xs={12}
              className={"gridClassTitle"}
            >
              <h3 className="titleVideo">{current_unit.title}</h3>
            </Grid>

            {current_unit.description !== null ? (
              <div>
                {/* <Grid item lg={1} xs={1} /> */}
                <Grid item lg={10} xs={10}>
                  {current_unit.description}
                </Grid>
                <Grid item lg={1} xs={1} />
              </div>
            ) : null}

            {/* // {current_unit.current.unit.files.length > 0 ? <Typography>Leitura complementar</Typography> : null} */}
            <Grid container></Grid>
            <Grid container>
              {current_unit.files.length > 0
                ? current_unit.files.map((file, index) => (
                    <Grid item xs={12} md={2} l={4} key={`file_${index}`}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={`file_${index}`}
                        style={{ textDecoration: "none", color: "#DDD2" }}
                      >
                        <button className={"bntLinkFiles"}>
                          <CloudDownload style={{ marginRight: 10 }} />
                          {file.name}
                        </button>
                      </a>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Grid>
        </div>
      );
    }
  }

  return null;
}

const mapStateToProps = (state) => ({
  current_unit: state.courseState.current_unit,
  current_course_units: state.courseState.current_course_units,
  perfil: state.perfilState.perfil,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setFinishedUnit,
      postComment,
      postReply,
      getUnit,
      getUser,
      setLoading,
      getUserCourseUnits,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Aula));
