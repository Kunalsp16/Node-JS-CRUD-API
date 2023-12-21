import express, { Request, Response } from 'express';
import { User, createUser } from '../models/User';

const router = express.Router();
let users: User[] = [];

// GET api/users
router.get('/',(req: Request, res: Response) => {
    res.status(200).json(users);
});

// GET api/users/{userId}
router.get('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

// POST api/users
router.post('/', (req: Request, res: Response) => {
    const { username, age, hobbies } = req.body;
  
    if (!username || !age || !hobbies) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const newUser = createUser(username, age, hobbies);
    users.push(newUser);
  
    res.status(201).json(newUser);
  });