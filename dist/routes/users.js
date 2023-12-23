"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
let users = [];
// GET api/users
router.get('/', (req, res) => {
    res.status(200).json(users);
});
// GET api/users/{userId}
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!(0, uuid_1.validate)(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});
// POST api/users
router.post('/', (req, res) => {
    const { username, age, hobbies } = req.body;
    if (!username || !age || !hobbies) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newUser = (0, User_1.createUser)(username, age, hobbies);
    users.push(newUser);
    res.status(201).json(newUser);
});
// PUT api/users/{userId}
router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!(0, uuid_1.validate)(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const { username, age, hobbies } = req.body;
    const updatedUser = { id: userId, username, age, hobbies };
    users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
});
// DELETE api/users/{userId}
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
    if (!(0, uuid_1.validate)(userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});
exports.default = router;
