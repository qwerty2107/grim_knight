const image_urls = [
    "./images/knight.jpg", // 0 - knight
    "./images/graveyard.jpg" // 1 - graveyard
];


async function loadImages(imageUrlArray)
{
    const promise_array = []; // create an array for promises
    const image_array = []; // array for the images

    for (let image_url of imageUrlArray) {

        promise_array.push(new Promise(resolve => {

            const img = new Image();
            img.onload = resolve;
            img.src = image_url;
            image_array.push(img);
        }));
    }

    await Promise.all(promise_array); // wait for all the images to be loaded
    console.log("all images loaded");
    return image_array;
}

// async function flip_images(image_array)
// {
//     const promise_array = []; // create an array for promises
//     const flipped_array = []; // array for the images

//     for (let image of image_array) {

//         promise_array.push(new Promise(resolve => {

//             const img = new Image();
//             img.onload = resolve;
//             img.src = image_url;
//             image_array.push(img);
//         }));
//     }

//     await Promise.all(promise_array); // wait for all the images to be loaded
//     console.log("all images loaded");
//     return image_array;
// }



const canvas = document.getElementById("map_canvas");
const ctx = canvas.getContext("2d");
const images = await loadImages(image_urls);
console.log(images);
socket.emit("all_loaded");

class Map_sprite
{
    constructor(sprite_id)
    {
        this.entities = [];
        this.sprite = images[sprite_id];
    }
    draw()
    {
        //console.log("drawing map");
        ctx.drawImage(this.sprite, 500 - player.x, 500 - player.y, 1000, 1000);
    }
}

const entity_sprites = new Map();
class Entity_sprite
{
    constructor(id, sprite_id, x, y, rotation)
    {
        this.x = x;
        this.y = y;
        //console.log("Coords: ", this.x, this.y);
        this.rotation = rotation;
        // this.sprite = `./images/${sprite_id}.jpg`;
        this.sprite = images[sprite_id];
        entity_sprites.set(id, this);
        // this.sprite.src = "./images/knight.jpg";
    }
    draw()
    {
        //console.log("drawing entity");
        // ctx.save();
        // ctx.rotate(this.rotation);
        ctx.drawImage(this.sprite, this.x - player.x, this.y - player.y, 100, 100);
        // ctx.restore();
    }
}

class Player
{
    constructor(sprite_id, x, y, rotation)
    {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.sprite = images[sprite_id];
    }
    draw()
    {
        ctx.drawImage(this.sprite, 500, 500, 100, 100);
    }
}

let map_sprite = Map_sprite[0]; //Placeholder image
let player = new Player(0, 0, 0, 0); //Placeholder

socket.on("spawn", (id, sprite_id, x, y, rotation) =>
{
    //console.log("something spawned");
    new Entity_sprite(id, sprite_id, x, y, rotation);
});

socket.on("spawn_player", (sprite_id, x, y, rotation) =>
{
    //console.log("something spawned");
    player = new Player(sprite_id, x, y, rotation);
});

socket.on("relocate", (id, x, y, rotation) =>
{
    let moving_entity = entity_sprites.get(id);
    moving_entity.x = x;
    moving_entity.y = y;
    moving_entity.rotation = rotation;
});

socket.on("player_relocate", (x, y, rotation) =>
{
    player.x = x;
    player.y = y;
    player.rotation = rotation;
});



socket.on("add_map", (sprite_id) =>
{
    map_sprite = new Map_sprite(sprite_id);
    map_sprite.draw();
    console.log(entity_sprites.length);
});

// socket.on("tick", () =>
// {
//     //console.log("tick");
//     map_sprite.draw();
//     for (let sprite of entity_sprites.values())
//     {
//         sprite.draw();
//     }
// })

const timer = setInterval(() =>
{
    draw_all();
}, 20);


function draw_all()
{
    map_sprite.draw();
    for (let sprite of entity_sprites.values())
    {
        sprite.draw();
    }
    player.draw();
}


// function spawn_entity(x, y, sprite_id)
// {
//     let sprite = document.createElement("img");
//     this.sprite.setAttribute("id", this.id);
//     this.sprite.setAttribute("class", "entity");
//     map.frame.appendChild(this.sprite);
// }
// function draw_entity()
// {
//     this.sprite.style.left = `${map.resolution*this.position.coords[0]}px`;
//     this.sprite.style.top = `${map.resolution*this.position.coords[1]}px`;
//     this.sprite.style.height = `${map.resolution}px`;
//     this.sprite.style.width = `${map.resolution}px`;
//     this.sprite.style.rotate = `${this.rotation}deg`;
//     this.sprite.setAttribute("src", this.image);
// }