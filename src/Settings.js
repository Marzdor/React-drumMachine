import React from "react";

const Settings = props => {
  const recClass = props.recording ? "recOn" : "recOff";
  return (
    <div id="record">
      <div id="recLight" className={recClass} />
      <button onClick={props.handleRecClick}>Record</button>
      <button onClick={props.handlePlaybackClick}>Playback</button>
    </div>
  );
};

export default Settings;
