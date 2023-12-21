import express, { Request, Response } from 'express';
import { User, createUser } from '../models/User';

const router = express.Router();
let users: User[] = [];

// GET api/users
router.get('/',(req: Request, res: Response) => {
    res.status(200).json(users);
});