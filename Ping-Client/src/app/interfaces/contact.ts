import { Account } from "./account";

export interface Contact {
    contactID: Account,
    roomID: string,
    totalMessageCount: number,
    readMessageCount: number,
    myMessageCount: number,
    readMessages: number,
    state: string,
}
