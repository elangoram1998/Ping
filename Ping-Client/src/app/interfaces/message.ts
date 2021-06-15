import { Account } from "./account";

export interface Message {
    _id: string,
    owner_id: Account,
    message: string,
    type: string,
    messageCount: number,
    state: string,
    messageHeight: number,
    created_At: Date
}
