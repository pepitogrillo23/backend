import express from "express";
import './config/mongoose.js';
import cors from "./middleware/cors.js";
import usersRouter from './routes/users.js';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors);
app.use(express.json());
app.use('/users', usersRouter);

app.listen(PORT, () => console.log('server running on PORT ' + PORT));