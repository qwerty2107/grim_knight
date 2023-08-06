import { Entity } from "./entities.mjs";
import { Location } from "./location.mjs";

// directions
//         7 0 1
//         6`+ 2
//         5 4 3


export class Player extends Entity
{
    constructor(x, y, location, sprite_id)
    {
        super(x, y, location, sprite_id);
        this.speed = 5;
    }
    move(x_direction, y_direction)
    {
        let x_diff = 0;
        let y_diff = 0;
        switch (x_direction)
        {
            case "w":
                x_diff = -this.speed;
                break;
            case "e":
                x_diff = this.speed;
                break;
            case null:
                x_diff = 0;
                break;
        }
        switch (y_direction)
        {
            case "n":
                if (x_diff != 0)
                {
                    x_diff = x_diff / 2;
                    y_diff = (-this.speed) / 2;
                }
                else
                {
                    y_diff = -this.speed;
                }
                break;
            case "s":
                if (x_diff != 0)
                {
                    x_diff = x_diff / 2;
                    y_diff = this.speed / 2;
                }
                else
                {
                    y_diff = this.speed;
                }
                break;
            case null:
                y_diff = 0;
                break;
        }
        this.x += x_diff;
        this.y += y_diff;
        this.relocate();
    }
    act()
    {
        this.move(this.x_direction, this.y_direction);
    }
}