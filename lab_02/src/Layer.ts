export const initLayers = (numberOfLayers: number) => {

    const layerContainer = document.getElementById("layerContainer");
    for(let i = 0; i < numberOfLayers; i++) {
        const newLayer = document.createElement("div");
        const recordBtn = document.createElement("button");
        recordBtn.innerHTML = "Record";
        recordBtn.classList.add("record-btn")
        recordBtn.dataset.key = String(i);

        const stopRecordingBtn = document.createElement("button");
        stopRecordingBtn.innerHTML = "Stop recording";
        stopRecordingBtn.disabled = true;
        stopRecordingBtn.classList.add("stop-recording-btn")
        stopRecordingBtn.dataset.key = String(i);

        const playBtn = document.createElement("button");
        playBtn.innerHTML = "Play";
        stopRecordingBtn.disabled = true;
        playBtn.classList.add("play-btn")
        playBtn.dataset.key = String(i);

        newLayer.appendChild(recordBtn);
        newLayer.appendChild(stopRecordingBtn);
        newLayer.appendChild(playBtn);
        layerContainer?.appendChild(newLayer);
    }

}