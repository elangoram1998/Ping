import { Account } from "./account";

export interface Contact {
    contactID: Account,
    roomID: string,
    totalMessageCount: number,
    readMessageCount: number,
    state: string,
}
