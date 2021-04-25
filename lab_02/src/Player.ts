import Keyboard from "./Keyboard";
import Recorder from "./Recorder";

export default class Player 
{
    private recorder: Recorder;
    private keyboard: Keyboard;

    constructor(recorder: Recorder, keyboard: Keyboard) {
        this.recorder = recorder;
        this.keyboard = keyboard;
    }

    play() {
        let channel = this.recorder.getChannel();
        let startAt = this.recorder.startAt;

        let prevTime = startAt;
        channel?.forEach((step: any) => {
            if(prevTime == 0) {
                prevTime = step.time;
            }

            let timeout = step.time - prevTime;
            setTimeout(() => {
                this.keyboard.setKey(step.key);
                this.keyboard.play();
            }, timeout);
        });
    }
}