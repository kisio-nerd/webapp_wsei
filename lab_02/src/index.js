"use strict";
exports.__esModule = true;
var Keyboard_1 = require("./Keyboard");
var Recorder_1 = require("./Recorder");
var MappersKeyboard_1 = require("./mappers/MappersKeyboard");
var Player_1 = require("./Player");
var Layer_1 = require("./Layer");
var numberOfLayers = 4;
var recorders = [];
var players = [];
var keyboard = new Keyboard_1["default"]();
keyboard.load();
Layer_1.initLayers(numberOfLayers);
for (var index = 0; index < numberOfLayers; index++) {
    recorders[index] = new Recorder_1["default"]();
    players[index] = new Player_1["default"](recorders[index], keyboard);
}
function onKeyPress(event) {
    var _a;
    var key = String(event.key).toLocaleLowerCase();
    var time = event.timeStamp;
    var mapper = MappersKeyboard_1["default"].getMapper();
    if (key in mapper) {
        keyboard.setKey(mapper[key]);
        keyboard.play();
        for (var index = 0; index < numberOfLayers; index++) {
            (_a = recorders[index]) === null || _a === void 0 ? void 0 : _a.push(mapper[key], time);
        }
    }
}
function onClick(event) {
    var _a;
    var target = event.target;
    var soundKey = target.dataset.sound;
    var time = event.timeStamp;
    if (soundKey != undefined) {
        keyboard.setKey(soundKey);
        keyboard.play();
        for (var index = 0; index < numberOfLayers; index++) {
            (_a = recorders[index]) === null || _a === void 0 ? void 0 : _a.push(soundKey, time);
        }
    }
}
var recordBtns = document.querySelectorAll(".record-btn");
var stopRecordingBtns = document.querySelectorAll(".stop-recording-btn");
var playBtns = document.querySelectorAll(".play-btn");
function getInputIndex(event) {
    var target = event.target;
    return Number(target.dataset.key);
}
recordBtns === null || recordBtns === void 0 ? void 0 : recordBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        var index = getInputIndex(event);
        var recorder = recorders[index];
        if (recorder.state == Recorder_1.RecorderState.WAITING) {
            console.log("RECORD BTN!");
            recorder.clearChannel();
            recorder.state = Recorder_1.RecorderState.RECORDING;
            recorder.startAt = event.timeStamp;
            var recordBtn = document.querySelector("button.record-btn[data-key=\"" + index + "\"]");
            recordBtn.disabled = true;
            var stopRecordingBtn = document.querySelector("button.stop-recording-btn[data-key=\"" + index + "\"]");
            stopRecordingBtn.disabled = false;
        }
    });
});
stopRecordingBtns === null || stopRecordingBtns === void 0 ? void 0 : stopRecordingBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        var index = getInputIndex(event);
        var recorder = recorders[index];
        if (recorder.state == Recorder_1.RecorderState.RECORDING) {
            console.log("STOP RECORDING BTN!");
            recorder.state = Recorder_1.RecorderState.WAITING;
            var recordBtn = document.querySelector("button.record-btn[data-key=\"" + index + "\"]");
            recordBtn.disabled = false;
            var stopRecordingBtn = document.querySelector("button.stop-recording-btn[data-key=\"" + index + "\"]");
            stopRecordingBtn.disabled = true;
        }
    });
});
playBtns === null || playBtns === void 0 ? void 0 : playBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
        var index = getInputIndex(event);
        var recorder = recorders[index];
        var player = players[index];
        if (recorder.state == Recorder_1.RecorderState.WAITING) {
            console.log("PLAY BTN!");
            player.play();
        }
    });
});
document.addEventListener("keypress", onKeyPress);
var keyboardPanel = document.getElementById("keyboardPanel");
if (keyboardPanel != null) {
    var keys = keyboardPanel.querySelectorAll(".keyboardKey");
    keys === null || keys === void 0 ? void 0 : keys.forEach(function (key) {
        key.addEventListener("click", onClick);
    });
}
