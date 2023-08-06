import { io } from "../server.mjs";
import { player } from "./main.mjs";



io.on("connection", (socket) =>
{
    let x_direction = null;
    let y_direction = null;
    socket.on("key_pressed", (direction) =>
    {
        //console.log(direction);
        switch (direction)
        {
            case "w":
            case "e":
                x_direction = direction;
                break;
            case "n":
            case "s":
                y_direction = direction;
                break;
        }
        player.x_direction = x_direction;
        player.y_direction = y_direction;
    });
    socket.on("key_released", (direction) =>
    {
        switch (direction) {
            case "w":
            case "e":
                if (x_direction == direction)
                {
                    x_direction = null;
                }
                break;
            case "n":
            case "s":
                if (y_direction == direction)
                {
                    y_direction = null;
                }
                break;
        }
        player.x_direction = x_direction;
        player.y_direction = y_direction;
    });
});