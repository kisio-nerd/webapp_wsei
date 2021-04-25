class Recorder
{
    private _startAt: number = 0;
    private _state: RecorderState = RecorderState.WAITING;
    private _channel: any = [];

    push(key: string, time: number): void {
        if(this.state == RecorderState.RECORDING) {
            this._channel.push({key, time});
        }
    }

    getChannel() {
        return this._channel;
    }

    clearChannel(): void {
        this._channel = [];
    }

    public get state() {
        return this._state;
    }

    public set state(state: RecorderState) {
        this._state = state;
    }

    public get startAt() {
        return this._startAt;
    }

    public set startAt(startAt: number) {
        this._startAt = startAt;
    }
}

export default Recorder;

export enum RecorderState {
    WAITING,
    RECORDING
}
