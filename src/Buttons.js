import React from "react";

const Buttons = props => {
  const btnData = props.buttonData;
  const buttons = [];

  for (let key in btnData) {
    buttons.push(
      <button
        id={btnData[key].sound}
        className="drum-pad"
        key={btnData[key].sound}
      >
        <audio
          id={key}
          className="clip"
          src={
            "../public/assests/sounds" + btnData[key].sound + btnData[key].type
          }
        />
        {key}
      </button>
    );
  }
  return <div>{buttons}</div>;
};

export default Buttons;
