// import {io} from "socket.io-client";
// const socket = io("ws://localhost:8000");

// request_button = document.getElementById("request_button").addEventListener("click", send_request);

// document.addEventListener("keydown", function(event)
// {
//     if (event.repeat) return;
//     switch (event.key)
//     {
//         case "ArrowDown":
//             pressed_direction("s");
//             break;
//         case "ArrowUp":
//             pressed_direction("n");
//             break;
//         case "ArrowLeft":
//             pressed_direction("w");
//             break;
//         case "ArrowRight":
//             pressed_direction("e");
//             break;
//         default:
//             return;
//     }
//     // e.preventDefault();
// })

document.addEventListener("keydown", function(event)
{
    switch (event.key)
    {
        case "ArrowDown":
            pressed_direction("s");
            break;
        case "ArrowUp":
            pressed_direction("n");
            break;
        case "ArrowLeft":
            pressed_direction("w");
            break;
        case "ArrowRight":
            pressed_direction("e");
            break;
        default:
            return;
    }
    // e.preventDefault();
})

document.addEventListener("keyup", function(event)
{
    switch (event.key)
    {
        case "ArrowDown":
            released_direction("s");
            break;
        case "ArrowUp":
            released_direction("n");
            break;
        case "ArrowLeft":
            released_direction("w");
            break;
        case "ArrowRight":
            released_direction("e");
            break;
        default:
            return;
    }
    // e.preventDefault();
})

function pressed_direction(direction)
{
    socket.emit("key_pressed", direction);
}

function released_direction(direction)
{
    socket.emit("key_released", direction);
}