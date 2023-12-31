import { Entity } from "./entities.mjs";
import { Location } from "./location.mjs";
import { io } from "../server.mjs";

// directions
//         7 0 1
//         6`+ 2
//         5 4 3


export class Player extends Entity
{
    constructor(x, y, location, sprite_id)
    {
        super(x, y, location, sprite_id);
        this.acceleration = 0.1;
        this.max_speed = 3;
    }
    move(x_direction, y_direction)
    {
        let x_diff = 0;
        let y_diff = 0;
        switch (x_direction)
        {
            case "w":
                x_diff = -this.acceleration;
                break;
            case "e":
                x_diff = this.acceleration;
                break;
            case null:
                x_diff = this.acceleration * Math.sign(-this.x_speed) * 2;
                break;
        }
        switch (y_direction)
        {
            case "n":
                if (x_diff != 0)
                {
                    x_diff = x_diff / 2;
                    y_diff = (-this.acceleration) / 2;
                }
                else
                {
                    y_diff = -this.acceleration;
                }
                break;
            case "s":
                if (x_diff != 0)
                {
                    x_diff = x_diff / 2;
                    y_diff = this.acceleration / 2;
                }
                else
                {
                    y_diff = this.acceleration;
                }
                break;
            case null:
                y_diff = this.acceleration * Math.sign(-this.y_speed) * 2;
                break;
        }
        this.x_speed += x_diff;
        this.y_speed += y_diff;
        if (Math.abs(this.x_speed) + Math.abs(this.y_speed) > this.max_speed)
        {
            if (Math.abs(this.x_speed) > this.max_speed / 2)
            this.x_speed -= this.acceleration * Math.sign(this.x_speed) * 2
            if (Math.abs(this.y_speed) > this.max_speed / 2)
            this.y_speed -= this.acceleration * Math.sign(this.y_speed) * 2
        }
        this.x += this.x_speed;
        this.y += this.y_speed;
        this.relocate();
    }
    act()
    {
        this.move(this.x_direction, this.y_direction);
    }
    spawn()
    {
        io.emit("spawn_player", this.sprite_id, this.x, this.y, this.rotation);
    }
    relocate()
    {
        // if (this.x_speed >= 0) {this.looking_right = true;}
        // else {this.looking_right = false;}
        io.emit("player_relocate", this.x, this.y, this.rotation);
    }
}