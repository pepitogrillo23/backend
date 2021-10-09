import express from 'express';
import UserController from '../controllers/UserController.js';
const router = express.Router();

router.post('/register', UserController.register);
router.post('/', UserController.login);
router.put('/logout/:email', UserController.logout);
router.get('/', UserController.getUsers);
router.delete('/delete/:_id', UserController.delete);

export default router;
