// import React from "react";

// const Player = () => {
//   return (
//     <video
//       id="my-player"
//       className="video-js"
//       controls
//     >
//       <source
//         type="application/x-mpegURL"
//         src="https://d26olk7ydooir7.cloudfront.net/convert/adgrouptraining/desenho-tecnico/modulo-2/aula-1-tecnicas-de-desenho-a-mao-livre/aula-1-tecnicas-de-desenho-mao-livre-correto.m3u8"
//       ></source>
//     </video>
//   );
// };

// export default Player;

import React from "react";
import videojs from "video.js";



export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={(node) => (this.videoNode = node)}
            className="video-js"
          ></video>
        </div>
      </div>
    );
  }
}
