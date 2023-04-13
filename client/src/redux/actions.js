import axios from "axios";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CACHE = "CACHE";
export const PATH = "PATH";
export const GET_FILTER = "GET_FILTER"; 

export const getPokemons = () => {
    return async function (dispatch){
        await axios.get("http://localhost:3001/pokemons")
        .then(res => {
            const data = res.data

        console.log(data, 1)

         if(data.types) {
         data.types = data.types.map(e => e.name)
         }
            dispatch({ type: GET_POKEMONS, payload : data }) 
        })
        .catch(err => alert(err)) 
    }
};

export const getFiltradoTypes = (types) => {
  //console.log(types)
  return {
    type: GET_FILTER, 
    payload: types
  }
}; 

export const getPokemon = (id) => {
    return async function (dispatch){
        const pokemons = await axios.get(
            `http://localhost:3001/pokemons/${id}`);
        const data = pokemons.data;
        data.name = data.name.toUpperCase()
        data.types = data.types.map(e => e.name)
        data.type1 = data.types[0].replace(/^\w/, c => c.toUpperCase())
        data.type2 = data.types.length>1?data.types[1].toUpperCase():""
        dispatch({ type: GET_POKEMON, payload : data})
      
     }
};

export const getPokemonName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
      const pokemon = response.data;
      dispatch({ type: GET_POKEMON_NAME, payload: pokemon });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.statusText) {
        alert(error.response.statusText);
      } else {
        alert("Server error");
      }
    }
  };
};

export const cleanDetail = () => {
    return{
        type: CLEAN_DETAIL,
        payload: {}
    };
};

export const getCache = (pagina) => {
    return{
        type: CACHE,
        payload: pagina
    };
};

export const getPath = (path) => {
    return{
        type: PATH,
        payload: path
    };
};

