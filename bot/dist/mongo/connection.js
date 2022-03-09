"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConnectionString = void 0;
const environment_1 = require("../enum/environment");
const getMongoConnectionString = () => {
    switch (process.env.NODE_ENV) {
        case environment_1.Environment.DEV:
            return "mongodb://127.0.0.1:27017";
        case environment_1.Environment.DOCKERDEV:
            return "mongodb://host.docker.internal:27017";
        case environment_1.Environment.PRODUCTION:
            return "mongodb://mongo:27017";
        default:
            return "mongodb://host.docker.internal:27017";
    }
};
exports.getMongoConnectionString = getMongoConnectionString;
