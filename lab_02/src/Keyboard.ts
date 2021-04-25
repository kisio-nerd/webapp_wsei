import { IAudios } from "./interfaces/InterfacesKeyboard";

export default class Keyboard
{
    audios: IAudios = {};
    key: (string | null) = null;

    load(): void
    {
        let keyTypes = ["boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"];
        let audios: IAudios  = {};

        keyTypes.forEach(keyType => {
            let sound: (HTMLAudioElement | null) = document.querySelector(`[data-sound="${keyType}"]`);

            if(sound != null) {
                audios[keyType] = sound;
            }
        });

        this.audios = audios;
    }

    setKey(key: string) {
        this.key = key;
    }

    play()
    {
        if(this.key != null && (this.key in this.audios)) {
            let a = this.audios[this.key];
            a.currentTime = 0;
            a.play();
        }
    }
}