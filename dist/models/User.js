"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const uuid_1 = require("uuid");
const createUser = (username, age, hobbies) => ({
    id: (0, uuid_1.v4)(),
    username,
    age,
    hobbies,
});
exports.createUser = createUser;
