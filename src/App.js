import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as Tone from "tone";
import styled from "styled-components";

function App() {
  const buttonRef = useRef();
  const synth = new Tone.Synth().toDestination();
  const [synths, setSynths] = useState([
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(),
  ]);

  useEffect(() => {
    if (!synths) return;
    buttonRef.current.click();
    synths[0].oscillator.type = "triangle";
    synths[1].oscillator.type = "sine";
    synths[2].oscillator.type = "sawtooth";

    // synths.forEach((synth) => synth.toDestination());
  }, [synths]);

  async function runAudio() {
    console.log("Tone.context.state before click");
    console.log(Tone.context.state);
    // if (Tone.context.state !== "running") {
    Tone.start();
    Tone.context.resume();
    console.log("Tone.context.state after click");

    console.log(Tone.context.state);
    // synth.triggerAttackRelease("C3", "8n"); //4n 16n

    // synth.triggerAttackRelease("C1", "8n"); //4n 16n
    // synth.triggerAttackRelease("C2", "8n"); //4n 16n
    // synth.triggerAttackRelease("C3", "8n"); //4n 16n
    // synth.triggerAttackRelease("C20", "8n"); //4n 16n
    const synth = new Tone.Synth().toDestination();
    const melody = [
      { note: "E5", duration: "8n", timing: 0 },
      { note: "D#5", duration: "8n", timing: 0.25 },
      { note: "E5", duration: "8n", timing: 0.5 },
      { note: "D#5", duration: "8n", timing: 0.75 },
      { note: "E5", duration: "8n", timing: 1 },
      { note: "B4", duration: "8n", timing: 1.25 },
    ];
    melody.forEach((tune) => {
      const now = Tone.now();
      synth.triggerAttackRelease(tune.note, tune.duration, now + tune.timing);
    });
    console.log(Tone.context.state);
    // }
  }

  const SynthKeys = (props = {}) => {
    const { synth, name, note } = props;
    const now = Tone.now();

    return (
      <MidiKeyRow>
        <MidiKey
          onClick={() => {
            console.log(`${note} `);
            synth.triggerAttackRelease(note, "8n");
          }}
        >
          {name} {note}
        </MidiKey>
        <MidiKey
          onClick={() => {
            console.log(`${note} `);
            synth.triggerAttackRelease(note, "8n");
          }}
        >
          {name} {note}
        </MidiKey>
        <MidiKey
          onClick={() => {
            console.log(`${note} `);
            synth.triggerAttackRelease(note, "8n");
          }}
        >
          {name} {note}
        </MidiKey>
        <MidiKey
          onClick={() => {
            console.log(`${note} `);
            synth.triggerAttackRelease(note, "16n");
          }}
        >
          {name} {note}
        </MidiKey>
      </MidiKeyRow>
    );
  };

  return (
    <div className="App">
      <div>
        <h2>Tone</h2>

        <button
          ref={buttonRef}
          onClick={async () => {
            console.log("button click");
            console.log(Tone.context.state);
            // alert("start");
            // runAudio();
            if (Tone.context.state !== "running") {
              await Tone.start();
              Tone.context.resume();

              console.log(Tone.context.state);
            }
          }}
        >
          START
        </button>
      </div>

      {/* key container */}
      <MidiContainer>
        <SynthKeys synth={synths[0]} note="G5" name="tri" />
        <SynthKeys synth={synths[1]} note="E4" name="sine" />
        <SynthKeys synth={synths[2]} note="C3" name="saw" />
      </MidiContainer>
    </div>
  );
}

const MidiKey = styled.div`
  border: 2px solid red;
  width: 50px;
  height: 50px;
  display: inline-block;
  vertical-align: bottom;
  margin: 5px;
`;
const MidiKeyRow = styled.div``;
const MidiContainer = styled.div`
  border: 2px solid black;
`;

export default App;
