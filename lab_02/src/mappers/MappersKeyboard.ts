import { IMapper } from "../interfaces/InterfacesKeyboard";

export default class DefaultKeyboardMapper
{
    static getMapper(): IMapper
    {
        return {
            '1': "boom",
            '2': "clap",
            '3': "hihat",
            '4': "kick",
            '5': "openhat",
            '6': "ride",
            '7': "snare",
            '8': "tink",
            '9': "tom",
        };
    }
}