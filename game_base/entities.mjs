
import { io } from "../server.mjs";


export class Entity
{
    constructor(x, y, location, sprite_id)
    {
        this.x = x;
        this.y = y;
        // this.height = height;
        // this.width = width;
        this.rotation = 0;
        this.location = location;
        this.sprite_id = sprite_id;

        //this.x_acceleration = 0;
        //this.y_acceleration = 0;
        this.acceleration = 0.05;
        this.x_speed = 0;
        this.y_speed = 0;
        this.max_speed = 2;

        this.x_direction = null;
        this.y_direction = null;

        this.id = this.locationentities_counter; //Unique number
        this.location.entities.add(this);
        this.location.entities_counter += 1;
        // this.sprite = `images/${sprite_id}.jpg`;
    }
    // Add to the canvas
    spawn()
    {
        io.emit("spawn", this.id, this.sprite_id, this.x, this.y, this.rotation);
    }
    despawn()
    {
        this.location.entities.remove(this);
        io.emit("despawn", this.id);
    }
    relocate()
    {
        io.emit("relocate", this.id, this.x, this.y, this.rotation);
    }

    act()
    {
        //Activated by timer
    }
}