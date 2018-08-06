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
      playback: []
    };
    this.handlePadClick = this.handlePadClick.bind(this);
    this.handleRecClick = this.handleRecClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handlePadClick(e) {
    e.target.children[0].play();
    this.setState({
      displayText: e.target.id
    });
  }
  handleRecClick(e) {
    const rec = this.state.recording ? false : true;
    this.setState({
      recording: rec
    });
  }
  handleKeyPress(e) {
    const checkLetter = /[QWEASDZXC]/.test(e.key.toUpperCase());

    if (checkLetter && !this.state.fired) {
      const key = "#" + e.key.toUpperCase();
      const element = document.querySelector(key);
      element.play();
      this.setState({
        fired: true,
        displayText: element.parentElement.id
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
            recording={this.state.recording}
          />
        </section>
      </div>
    );
  }
}

export default App;
