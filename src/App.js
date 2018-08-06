import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons";
import Display from "./Display";
import Settings from "./Settings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonData: {
        Q: {
          sound: "Clap-1",
          type: ".mp3"
        },
        W: {
          sound: "Clap-2",
          type: ".mp3"
        },
        E: {
          sound: "Clap-3",
          type: ".mp3"
        },
        A: {
          sound: "CIHat",
          type: ".mp3"
        },
        S: {
          sound: "Kick-1",
          type: ".mp3"
        },
        D: {
          sound: "Kick-2",
          type: ".mp3"
        },
        Z: {
          sound: "Snr-1",
          type: ".mp3"
        },
        X: {
          sound: "Snr-2",
          type: ".mp3"
        },
        C: {
          sound: "Snr-3",
          type: ".mp3"
        }
      },
      fired: false,
      displayText: "- -",
      recording: false,
      lastClick: 0,
      delay: 0,
      playback: [],
      isPlaying: false
    };
    //btns
    this.handlePadClick = this.handlePadClick.bind(this);
    this.handleRecClick = this.handleRecClick.bind(this);
    this.handlePlaybackClick = this.handlePlaybackClick.bind(this);
    //keys
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handlePadClick(e) {
    e.target.children[0].play();

    this.setState({
      displayText: e.target.id
    });

    // if recoding track buttons in the state
    if (this.state.recording) {
      const playbackClone = this.state.playback.slice();
      const time = getTime(this.state.lastClick);

      playbackClone.push([e.target.children[0].id, time[1]]);
      this.setState({
        lastClick: time[0],
        playback: playbackClone
      });
    }
  }
  handleRecClick(e) {
    const rec = this.state.recording ? false : true;

    /// reset recorded data before recording new data
    if (!this.state.isPlaying) {
      if (rec) {
        this.setState({
          lastClick: 0,
          delay: 0,
          playback: []
        });
      }

      this.setState({
        recording: rec
      });
    }
  }

  handlePlaybackClick(e) {
    // if you are not currently recording then allow playback run
    if (!this.state.recording) {
      this.setState({ isPlaying: true });
      const playbackLen = this.state.playback.length;

      for (let i = 0; i < playbackLen; i++) {
        setTimeout(() => {
          const audio = document.querySelector("#" + this.state.playback[i][0]);
          this.setState({
            displayText: audio.parentElement.id
          });

          audio.play();

          if (playbackLen - 1 === i) {
            this.setState({ isPlaying: false });
          }
        }, this.state.playback[i][1]);
      }
    }
  }

  handleKeyPress(e) {
    const checkLetter = /[QWEASDZXC]/.test(e.key.toUpperCase());
    // check for valid key
    if (checkLetter && !this.state.fired) {
      const key = "#" + e.key.toUpperCase();
      const element = document.querySelector(key);
      element.play();
      this.setState({
        fired: true,
        displayText: element.parentElement.id
      });

      //if recording track buttons in state
      if (this.state.recording) {
        const playbackClone = this.state.playback.slice();
        const time = getTime(this.state.lastClick);

        playbackClone.push([key.slice(1), time[1]]);
        this.setState({
          lastClick: time[0],
          playback: playbackClone
        });
      }
    }
  }

  handleKeyUp(e) {
    const checkLetter = /[QWEASDZXC]/.test(e.key.toUpperCase());
    if (checkLetter && this.state.fired) {
      this.setState({
        fired: false
      });
    }
  }
  render() {
    return (
      <div
        onKeyPress={this.handleKeyPress}
        onKeyUp={this.handleKeyUp}
        id="drum-machine"
      >
        <Buttons
          handlePadClick={this.handlePadClick}
          buttonData={this.state.buttonData}
        />
        <section id="settings">
          <Display displayText={this.state.displayText} />
          <Settings
            handleRecClick={this.handleRecClick}
            handlePlaybackClick={this.handlePlaybackClick}
            recording={this.state.recording}
          />
        </section>
      </div>
    );
  }
}

function getTime(lastClick) {
  //Get time for delay between clicks
  const date = new Date();
  let time = date.getTime();

  if (lastClick === 0) {
    return [time, 0];
  } else {
    time = time - lastClick;
    return [lastClick, time];
  }
}

export default App;
