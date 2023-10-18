import express from 'express';
import { homeRouter } from './routes/home.router';

const app = express();

app.use('/', homeRouter);


app.listen(3000, 'localhost', () => {
    console.log("Server is listening on port: 3000");
    
});
