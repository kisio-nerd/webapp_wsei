import Keyboard from "./Keyboard";
import Recorder, { RecorderState } from "./Recorder";
import DefaultKeyboardMapper from "./mappers/MappersKeyboard";
import Player from "./Player";
import { initLayers } from "./Layer";

const numberOfLayers = 4;
const recorders: Recorder[] = [];
const players: Player[] = [];
const keyboard = new Keyboard();
keyboard.load();
initLayers(numberOfLayers);

for (let index = 0; index < numberOfLayers; index++) {
    recorders[index] = new Recorder()
    players[index] = new Player(recorders[index], keyboard);
}



function onKeyPress(event: KeyboardEvent)
{
    let key = String(event.key).toLocaleLowerCase();
    let time = event.timeStamp;

    let mapper = DefaultKeyboardMapper.getMapper();
    if(key in mapper) {
        keyboard.setKey(mapper[key]);
        keyboard.play();

        for (let index = 0; index < numberOfLayers; index++) {
            recorders[index]?.push(mapper[key], time);
        }
    }
}

function onClick(event: Event)
{
    let target = <HTMLElement> event.target;
    let soundKey: (string | undefined) = target.dataset.sound;
    let time = event.timeStamp;
    
    if(soundKey != undefined) {
        keyboard.setKey(soundKey);
        keyboard.play();

        for (let index = 0; index < numberOfLayers; index++) {
            recorders[index]?.push(soundKey, time);
        }
    }
}



let recordBtns = document.querySelectorAll(".record-btn");
let stopRecordingBtns = document.querySelectorAll(".stop-recording-btn");
let playBtns = document.querySelectorAll(".play-btn");

function getInputIndex(event: Event) {
    const target = (event.target as HTMLElement);
    return Number(target.dataset.key);
}

recordBtns?.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const index = getInputIndex(event);
        const recorder = recorders[index];

        if(recorder.state == RecorderState.WAITING) {
            console.log("RECORD BTN!");
            recorder.clearChannel();
            recorder.state = RecorderState.RECORDING;
            recorder.startAt = event.timeStamp;

            let recordBtn = document.querySelector(`button.record-btn[data-key="${index}"]`) as HTMLButtonElement;
            recordBtn.disabled = true;

            let stopRecordingBtn = document.querySelector(`button.stop-recording-btn[data-key="${index}"]`) as HTMLButtonElement;
            stopRecordingBtn.disabled = false;
        }
    });
});

stopRecordingBtns?.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const index = getInputIndex(event);
        const recorder = recorders[index];
        
        if(recorder.state == RecorderState.RECORDING) {
            console.log("STOP RECORDING BTN!");
            recorder.state = RecorderState.WAITING;

            let recordBtn = document.querySelector(`button.record-btn[data-key="${index}"]`) as HTMLButtonElement;
            recordBtn.disabled = false;

            let stopRecordingBtn = document.querySelector(`button.stop-recording-btn[data-key="${index}"]`) as HTMLButtonElement;
            stopRecordingBtn.disabled = true;
        }
    });
});

playBtns?.forEach(btn => {
    btn.addEventListener("click", function(event) {
        const index = getInputIndex(event);
        const recorder = recorders[index];
        const player = players[index];

        if(recorder.state == RecorderState.WAITING) {
            console.log("PLAY BTN!");
            player.play();
        }
    });
});



document.addEventListener("keypress", onKeyPress);



const keyboardPanel = document.getElementById("keyboardPanel");
if(keyboardPanel != null) {
    let keys = keyboardPanel.querySelectorAll(".keyboardKey");

    keys?.forEach(key => {
        key.addEventListener("click", onClick);
    });
}

