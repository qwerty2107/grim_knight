import { Location } from "./location.mjs";
import { Player } from "./player.mjs";
import { io } from "../server.mjs";

let graveyard = new Location(1000, 1000, 1);
export let player = new Player(0, 0, graveyard, 0);


function start()
{
    graveyard.add_map();
    player.spawn();
}

io.on("connection", (socket) =>
{
    socket.on("all_loaded", (socket) =>
    {
        console.log("all_loaded");
        start();
    });
});


// const graveyard = new Location(1000, 1000, "graveyard");
// const player = new Player(0, 0, graveyard, "knight");
// player.spawn();