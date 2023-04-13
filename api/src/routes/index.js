const { Router } = require('express');

const {getPokemonsHandler, 
      getPokemonIDHandler,
      postPokemonHandler,
      getTypesHandler, } = require("../handlers/handlers")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokemonsHandler);
router.get("/pokemons/:id", getPokemonIDHandler); 
router.post("/pokemons", postPokemonHandler)
router.get("/types", getTypesHandler); 

module.exports = router;
