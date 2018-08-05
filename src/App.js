import React, { Component } from "react";
import "./App.css";
import Buttons from "./Buttons";
import Display from "./Display";

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
      fired: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleClick(e) {
    e.target.children[0].play();
  }
  handleKeyDown(e) {
    const key = "#" + e.key.toUpperCase();
    const element = document.querySelector(key);
    const checkLetter = /[QWEASDZXC]/.test(e.key.toUpperCase());

    if (checkLetter && !this.state.fired) {
      element.play();
      this.setState({
        fired: true
      });
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
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        id="drum-machine"
      >
        <Buttons
          handleClick={this.handleClick}
          buttonData={this.state.buttonData}
        />
        <Display />
      </div>
    );
  }
}

export default App;
