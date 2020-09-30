import React from "react";

import "./timer.css";

function Timer({ string_timer, tubnaill }) {
  return (
    <div className="backdrop-timer">
      <img src={tubnaill} alt="tubnaill da aula" />
      <h1>Esta aula estará liberada em:</h1>
      <h3>{string_timer}</h3>
    </div>
  );
}

export default Timer;
