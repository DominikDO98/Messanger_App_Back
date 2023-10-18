import express from 'express';
import WebSocket from 'ws';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(3000, 'localhost', () => {
    console.log("Server is listening on port 3000");
    
});
