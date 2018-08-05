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
          type: ".wav"
        },
        W: {
          sound: "Clap-2",
          type: ".wav"
        },
        E: {
          sound: "Clap-3",
          type: ".wav"
        },
        A: {
          sound: "CIHat",
          type: ".wav"
        },
        S: {
          sound: "Kick-1",
          type: ".wav"
        },
        D: {
          sound: "Kick-2",
          type: ".wav"
        },
        Z: {
          sound: "Snr-1",
          type: ".wav"
        },
        X: {
          sound: "Snr-2",
          type: ".wav"
        },
        C: {
          sound: "Snr-3",
          type: ".wav"
        }
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.target.children[0].play();
    console.log(e.target.children[0]);
  }
  render() {
    return (
      <div id="drum-machine">
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
