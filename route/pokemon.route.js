const express = require('express');
const router = express.Router();

const pokemonDB = [
    {
        id: 1,
        name: 'Pikachu',
        health: 100,
        level: 10,
    },
    {
        id: 2,
        name: 'Charizard',
        health: 200,
        level: 50,
    },
    {
        id: 3,
        name: "Pikachard",
        health: 300,
        level: 99,
    },
]

// http://localhost:3000/api/pokemon/
router.get('/', function(req, res) {
    /*
    http://localhost:3000/api/pokemon/?name=Pika
    req.query = {
        name: 'Pika
    }
    */
    console.log(req.query);


    const nameSearchQuery = req.query.name;

    if(!nameSearchQuery) {
        res.send(pokemonDB);
        return;
    }

    const pokemonResponseList = [];
    for(let i = 0; i < pokemonDB.length; i++) {
        if(pokemonDB[i].name.includes(nameSearchQuery)) {
            pokemonResponseList.push(pokemonDB[i])
        }
    }

    res.send(pokemonResponseList)
})

// http://localhost:3000/api/pokemon/1 => Pikachu
router.get('/:pokemonId', function(req, res) {
    
    /*

    http://localhost:3000/api/pokemon/1
    req.params = {
        pokemonId: 1,
    }
    */

    console.log(req.params);

    for(let i = 0; i < pokemonDB.length; i++) {
        if(pokemonDB[i].id.toString() === req.params.pokemonId) {
            return res.send(pokemonDB[i]);
        }
    }

    res.status(404)
    res.send("No pokemon with ID " + req.params.pokemonId + " found :(");

})

router.post('/', function(req, res) {
    let health = req.body.health;
    let level = req.body.level;
    const name = req.body.name;
    if(!name) {
        res.status(400);
        return res.send('Some values for new pokemone missing: ' + JSON.stringify(req.body));
    }

    if(!health) {
        health = 100;
    }

    if(!level) {
        level = 1;
    }

    const id = pokemonDB.length + 1;

    const newPokemon = {
        name: name,
        level: level,
        health: health,
        id: id,
    }

    pokemonDB.push(newPokemon);

    res.send("Created new Pokemon with ID "  + id);
})

router.put('/:id', function(req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    let updatedPokemon = null;
    for(let i = 0; i<pokemonDB.length; i++){
        if(pokemonDB[i].id===parseInt(req.params.id)){
            if(req.body.health){
                pokemonDB[i].health=req.body.health
            }
            if(req.body.level){
                pokemonDB[i].level=req.body.level
            }
            if(req.body.name){
                pokemonDB[i].name=req.body.name
            }
            updatedPokemon = pokemonDB[i]
            break
        }
    }
    if(updatedPokemon){
        console.log("updated pokemon is "+JSON.stringify(updatedPokemon))
        res.send(updatedPokemon);
    } else{
        // return a 404 if no pokemon matches that pokemonId  
        res.status(404)
        res.send("No Pokemon found with the id: " + re1.query.id)
    }   
})

router.delete('/:id', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    let deletedPokemon = null;
    for(let i = 0; i<pokemonDB.length; i++){
        if(pokemonDB[i].id===parseInt(req.params.id)){
            deletedPokemon = pokemonDB[i]
            pokemonDB.splice(i, 1)
            break
        }
    }
    if(deletedPokemon){
        console.log("deleted pokemon is "+JSON.stringify(deletedPokemon));
        console.log("current database: " + JSON.stringify(pokemonDB));
        // return 200 even if no pokemon matches that Id
        res.status(200).send(pokemonDB);
    } else {
        res.status(404).send({error: 'Pokemon with the id '+req.query.pokemonID+' not found'})
    }
})

// // http://localhost:3000/api/pokemon/favorite
// router.get('/favorite', function(req, res) {
//     res.send('Insert fav pokemon here')
// })

module.exports = router;


// https://www.amazon.com/s?k=bananas


// https://www.google.com/search?
// q=banana
// &
// sca_esv=fdf711029b3ac2cc
// &
// sxsrf=ADLYWII3VnuXffT4ttzzUsl3DoqsAqAZEQ%3A1731642035039
// &
// source=hp
// &
// ei=ssI2Z6qoPKLw0PEP_qeXsAM
// &
// iflsig=AL9hbdgAAAAAZzbQw_j7tei4x1cifyM1mLC7k4wYKe6E&ved=0ahUKEwiqyf6itd2JAxUiODQIHf7TBTYQ4dUDCBg
// &
// uact=5&
// oq=banana
// &gs_lp=Egdnd3Mtd2l6IgZiYW5hbmEyCBAAGIAEGLEDMg4QLhiABBixAxjRAxjHATIOEC4YgAQYsQMY0QMYxwEyCBAuGIAEGLEDMggQLhiABBixAzIFEC4YgAQyCBAAGIAEGLEDMggQABiABBixAzILEC4YgAQYsQMY1AIyCBAAGIAEGLEDSPwEUABYxANwAHgAkAEAmAE9oAHNAqoBATa4AQPIAQD4AQGYAgagAvECwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiDAcICERAuGIAEGLEDGNEDGIMBGMcBwgIIEC4YgAQY1ALCAgsQLhiABBjRAxjHAcICBRAAGIAEwgILEC4YgAQYsQMYgwHCAg4QLhiABBixAxiDARiKBcICFBAuGIAEGLEDGNEDGIMBGMcBGMkDwgILEAAYgAQYkgMYigXCAg4QLhiABBjHARiOBRivAZgDAJIHATagB_tW&sclient=gws-wiz&safe=active&ssui=on


// https://www.amazon.com/dp/B07FYYKKQK/