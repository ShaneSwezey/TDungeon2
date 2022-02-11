import { Event } from "../enums/event";

export const formatEvent = (event: Event) => {
    switch(event) {
        case Event.PHYSICALATTACK:
            return "Physical Attack";
        case Event.FLURRY:
            return "Flurry";
        case Event.CLEAVE:
            return "Cleave";
        case Event.DODGE:
            return "Dodge";
        default:
            return "Unkown";
    }
}