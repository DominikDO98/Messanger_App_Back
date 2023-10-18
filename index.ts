import express from 'express';
import { homeRouter } from './routes/home.router';
import { authRouter } from './routes/auth.router';

const app = express();

app.use(express.json());

app.use('/', homeRouter);
app.use("/auth", authRouter)


app.listen(3000, 'localhost', () => {
    console.log("Server is listening on port: 3000");
    
});
