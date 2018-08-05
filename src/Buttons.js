import React from "react";

function importAllSounds(sound) {
  let sounds = {};
  sound.keys().map((item, index) => {
    return (sounds[item.replace("./", "")] = sound(item));
  });
  return sounds;
}

const sounds = importAllSounds(
  require.context("./assests/sounds/", false, /\.mp3$/)
);

const Buttons = props => {
  const btnData = props.buttonData;
  const buttons = [];

  for (let key in btnData) {
    const sound = btnData[key].sound;
    const type = btnData[key].type;

    buttons.push(
      <button
        id={sound}
        className="drum-pad"
        key={sound}
        onClick={props.handleClick}
      >
        <audio id={key} className="clip" src={sounds[sound + type]} />
        {key}
      </button>
    );
  }
  return <div id="buttons">{buttons}</div>;
};

export default Buttons;
