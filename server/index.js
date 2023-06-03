import express from 'express';
import { config } from 'dotenv';
import http from 'http';

config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
})