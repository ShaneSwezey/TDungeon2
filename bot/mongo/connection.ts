import { Environment } from "../enum/environment";

export const getMongoConnectionString = (): string => {
    switch(process.env.NODE_ENV) {
        case Environment.DEV:
            return "mongodb://127.0.0.1:27017";
        case Environment.DOCKERDEV:
            return "mongodb://docker.for.mac.localhost:27017";
        case Environment.PRODUCTION:
            return "mongodb://mongo:27017";
        default:
            return "mongodb://127.0.0.1:27017";
    }
}