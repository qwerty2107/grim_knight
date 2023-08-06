
import { io } from "../server.mjs";
import { player } from "./main.mjs";



io.on("connection", (socket) =>
{
    {
        const timer = setInterval(() =>
        {
            player.act(); //Rewrite later to every_creature.act()
            socket.emit("tick");
        }, 20);
    }
});
