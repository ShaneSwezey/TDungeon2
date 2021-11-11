export enum EventType {
    ATTACKED = "ATTACKED",
    DEFENDED = "DEFENED",
    DEBUFFED = "BEBUFFED",
    BUFFED = "BUFFED",
    KILLED = "KILLED"
}

export interface Event {
    type: EventType
}

export interface ATTACKEVENT extends Event {
    type: EventType.ATTACKED,
    value: number;
}