import { Message } from "./message";

export interface MessageCollection {
    roomID: string,
    currectSclHeight: number,
    totalScrollHeight: number,
    messages: Message[],
    areMessagesLoaded: boolean
}
