//const { Pokemon, Type, PokemonTypes } = require("../db")
const axios = require("axios"); 
const { Type, Pokemon } = require("../db")

//  --------------------------------------------POKEMONS API-------------------------------------------------------- //
const pokemonsAllApi = async () => {
    const pokeapi = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40")


    let urls = pokeapi.data.results
    let arrayUrls = urls.map(e => e.url ); 
    let arrayDetalles = [];

    for(var i = 0; i < arrayUrls.length; i++){
    const aux = await axios.get(arrayUrls[i])
    arrayDetalles.push(aux.data)
    }; 

    // let types = [];  
    // urls.types.map(e => types.push({name: e.type.name}))

    const detalles = arrayDetalles.map(e => {
        return {
            id:e.id, 
            name:e.name, 
            hp:e.stats.find(e => e.stat.name === "hp").base_stat,
            attack:e.stats.find(e => e.stat.name === "attack").base_stat,
            defense:e.stats.find(e => e.stat.name === "defense").base_stat,
            speed:e.stats.find(e => e.stat.name === "speed").base_stat,
            weight:e.weight,
            height:e.height,
            image:e.sprites.other.home.front_default,
            types: e.types.map(type => { return { name: type.type.name } })
        }
    });
    //console.log(detalles); 
    return detalles
}; 

// ------------------------------------------------API POR ID------------------------------------------------------- // 

const pokemonIdApi = async (id) => {
    const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = pokemonApi.data

    let types = [];  
    data.types.map(e => types.push({name: e.type.name}))

    const pokemon = {
        id: data.id,
        name: data.name,
        hp: data.stats.find(e => e.stat.name === "hp").base_stat,
        attack: data.stats.find(e => e.stat.name === "attack").base_stat,
        defense: data.stats.find(e => e.stat.name === "defense").base_stat,
        speed: data.stats.find(e => e.stat.name === "speed").base_stat,
        weight: data.weight,
        height: data.height,
        image: data.sprites.other.home.front_default,
        types
    };
    //console.log(pokemon); 
    return pokemon
}; 

// ------------------------------------------------API POR NAME------------------------------------------------------- // 

const pokemonNameApi = async (name) => {
    const pokemonApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = pokemonApi.data
    let types = []; 
    data.types.map(e => types.push({name: e.type.name}))
    
    const pokemon = {
        id: data.id,
        name: data.name,
        hp: data.stats.find(e => e.stat.name === "hp").base_stat,
        attack: data.stats.find(e => e.stat.name === "attack").base_stat,
        defense: data.stats.find(e => e.stat.name === "defense").base_stat,
        speed: data.stats.find(e => e.stat.name === "speed").base_stat,
        weight: data.weight,
        height: data.height,
        image: data.sprites.other.home.front_default,
    };
    // console.log(pokemon)
    return pokemon
};

// -------------------------------------------- ME TRAIGO LOS TYPES DE LA API------------------------------------ // 

const allTypes = async () => {
    const pokeapi = await axios.get("https://pokeapi.co/api/v2/type")
    // console.log(pokeapi.data.results)
    let types = []; 

    const data = pokeapi.data.results
    data.map(e => types.push({name: e.name}))
    // console.log(types)    
    return types; 
};


// --------------------------- CARGO LA BASE DE DATOS CON LOS TYPES ---------------------------------------- // 

const cajaTypes = async () => {
    const BBD = await allTypes()
    //console.log(BBD) 
    for(var i = 0; i < BBD.length; i++){
        await Type.create(BBD[i]);
    };
};

// ------------------------------ CONVIERTE LOS ELEMENTOS EN UN ARRAY DE ID SEGUN SU TIPO ---------------------------------- // 

const idTypes = async (type1, type2) => {
    const typesAll = await Type.findAll({ raw: true }); // raw: true me trae los datos mas limpios. 
    //console.log(typesAll)
    let arrId = [];
    typesAll.forEach(e => {
        if(e.name === type1) arrId.push(e.id);
        if(e.name === type2) arrId.push(e.id);
    });
    console.log(type1)
    console.log(type2);
    return arrId;
};

// ----------------------------------------- TODOS LOS POKEMONES DE LA BASE DE DATOS ----------------------------- // 
const pokemonsAllBDD = async () => {
    const BBD = await Pokemon.findAll(
       { raw : true,
        include: {
            model: Type,
            attributes: ["name"],
            through:{
                attributes: [] 
            }} 
        },
    )
    console.log(BBD)
    return BBD;
};

// ------------------------------------------------TODOS LOS POKEMONS API + BBD------------------------------------------------------- // 

const todosPokemones = async () => {
    const todosApi = await pokemonsAllApi(); 
    // console.log(todosApi)
    const BBD = await Pokemon.findAll(
        { raw : true,
         include: {
             model: Type,
             attributes: ["name"],
             through:{
                 attributes: [] 
             }} 
         },
     )
    console.log(BBD)
    const all = todosApi.concat(BBD)
    //console.log(all)
    return all; 
}; 

// -----------------------------------------------BBD POR NAME-------------------------------------------------------

const pokemonByNameBBD = async (name) => {
    const resultsBDD = await Pokemon.findOne({ 
        where : { name },
        include: {
            model: Type,
            attributes: ["name"],
            through:{
                attributes: [] 
            }
        }}
    );
    return resultsBDD;
};


// ------------------------------ CONTROLLERS ---------------------------------- // 

const createPokemon = async (id,name,hp,attack,defense,speed,weight,height,image,type1,type2) => {
    const newPokemon = await Pokemon.create({id,name,hp,attack,defense,speed,weight,height,image});
    const arrIdTypes = await idTypes(type1, type2)
    await newPokemon.addTypes(arrIdTypes);
    return newPokemon;
};

const findPokemonByName = async (name) => {
    const resultBDD = await pokemonByNameBBD(name);
    if(resultBDD) return resultBDD;
    const resultApi = await pokemonNameApi(name) 
    if(resultApi) return resultApi;
};

const findPokemonById = async (id) => {
    if(!isNaN(id)){ // si hay un numero es de la api, si no es numerico bbd
        const pokemonApi = await pokemonIdApi(id);
        return pokemonApi;
    }else{
        const pokemonBDD = await Pokemon.findByPk(id,{include: {
            model: Type,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }},)
        
        return pokemonBDD;
    }
};



module.exports = {pokemonsAllApi, 
                  pokemonIdApi, 
                  pokemonNameApi, 
                  allTypes, 
                  cajaTypes, 
                  createPokemon, 
                  idTypes, 
                  todosPokemones, 
                  pokemonsAllBDD, 
                  findPokemonByName,
                  findPokemonById}