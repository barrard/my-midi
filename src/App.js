import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as Tone from "tone";

function App() {
  const synth = new Tone.Synth().toDestination();

  useEffect(() => {
    console.log(Tone.context.state);

    if (Tone.context.state !== "running") {
      Tone.start();
      console.log(Tone.context.state);
      // synth.triggerAttackRelease("C3", "8n"); //4n 16n
    }
  }, []);

  // synth.triggerAttackRelease("C1", "8n"); //4n 16n
  // synth.triggerAttackRelease("C2", "8n"); //4n 16n
  // synth.triggerAttackRelease("C3", "8n"); //4n 16n
  synth.triggerAttackRelease("C20", "8n"); //4n 16n
  console.log(Tone.context.state);
  return (
    <div className="App">
      <div>
        <h2>Tone</h2>

        <button
          onClick={() => {
            console.log(Tone.context.state);

            if (Tone.context.state !== "running") {
              Tone.start();
              console.log(Tone.context.state);
            }
          }}
        >
          START
        </button>
      </div>
    </div>
  );
}

export default App;
