import { ResponseType } from "../enums/responseType";

export interface Response {
    type: ResponseType
    text: string;
}