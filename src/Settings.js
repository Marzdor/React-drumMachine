import React from "react";

const Settings = props => {
  const recClass = props.recording ? "recOn" : "recOff";
  return (
    <div>
      <div id="recLight" className={recClass} />
      <button onClick={props.handleRecClick}>Record</button>
      <button>Record</button>
    </div>
  );
};

export default Settings;
