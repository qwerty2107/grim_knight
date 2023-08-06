import express from 'express';
import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";
import {Server} from "socket.io";

const PORT = 8000;
const app = express();
const server = http.createServer(app);
export const io = new Server(server);


const main_screen = path.join(process.cwd(), "./game_client/main_screen.html");

app.use(express.static(path.join(process.cwd(), "game_client")));

app.get('/', (req, res) =>
{
    res.sendFile(main_screen);
});

io.on("connection", (socket) =>
{
    console.log("a user connected");
    socket.on("disconnect", () =>
    {
        console.log("user disconnected");
    });
});

  
server.listen(PORT, () =>
{
    console.log(`listening on *:${PORT}`);
});