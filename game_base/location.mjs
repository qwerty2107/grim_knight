import { io } from "../server.mjs";

export class Location
{
    constructor(height, width, sprite_id)
    {
        this.height = height;
        this.width = width;
        this.sprite_id = sprite_id;
        this.sprite = `images/${sprite_id}.jpg`;
        this.entities = new Set();
        this.entities_counter = 0; //Unique keys for sprites map on client side
    }
    add_map()
    {
        io.emit("add_map", this.sprite_id);
    }
}