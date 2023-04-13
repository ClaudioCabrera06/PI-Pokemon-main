const { findPokemonById, createPokemon, todosPokemones, findPokemonByName, idTypes} = require("../controllers/controllers")

// Ruta que trae todos los pokemones y ademas el que quiera en particular por api y bbd
// si no hay query trae todos. 
const getPokemonsHandler = async(req, res) => {
    const { name } = req.query;
    try {
        if(name) {
            const pokemon = await findPokemonByName(name);
            res.status(200).json(pokemon)
        }else{
            const allPokemons = await todosPokemones(name);
            res.status(200).json(allPokemons);
        };
    } catch (error) {
        res.status(404).json({
            error: error.message
        });
    };
};

// Ruta que me trae los pokemones por ID
const getPokemonIDHandler = async (req, res) => {
    const { id } = req.params;
    console.log(id);
  try {
    const pokemon = await findPokemonById(id)
    res.status(200).json(pokemon)
  } catch (error) {
    res.status(400).json({
        error: error.message
    })
  }
};

// Ruta de tipo POST
const postPokemonHandler = async (req, res) => {
    try {
        const {id,name,hp,attack,defense,speed,weight,height,image,type1,type2} = req.body;
        const newPokemon = await createPokemon(id,name,hp,attack,defense,speed,weight,height,image,type1,type2);
            res.status(201).json(newPokemon)
    } catch (error) {
            res.status(400).send({
                error: error.message
            });
    };   
};

// Ruta de tipo Types
const getTypesHandler = async (req, res) => {
    try {
        const types = await idTypes();
        res.status(200).json(types);
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
};

module.exports = {
    getPokemonsHandler, 
    getPokemonIDHandler,
    postPokemonHandler,
    getTypesHandler, 
}; 