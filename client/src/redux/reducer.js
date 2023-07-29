import { 
    GET_POKEMONS, 
    GET_POKEMON,
    GET_POKEMON_NAME, 
    CLEAN_DETAIL,
    CACHE,
    PATH, 
   } from "./actions";
  
  const initialState = {
      allpokemons: [],
      paginaactual: 1,
      pokemons: [],
      pokemonDetail: {},
      cache: 1,
      path: ""
    };
  
  const rootReducer = (state = initialState, action) => {
      switch (action.type) {
        case CLEAN_DETAIL:
          return {
            ...state,
            pokemonDetail: {}
          }
          case GET_POKEMONS:
          return {
              ...state,
              allpokemons: action.payload,
              pokemons: action.payload
            }
  
        case GET_POKEMON_NAME:
          return {
            ...state,
            pokemons: [ action.payload ],
            paginaactual: 1
          }
           
        case "GET_POKEMON":
          return {
            ...state,
            pokemonDetail : action.payload 
          }
        case "CACHE":
          return {
            ...state,
            cache: action.payload
          }
        
        case "PATH":
          return {
            ...state,
            path: action.payload
          }

          case "ORDER_A_Z": 
          const aux = state.pokemons.sort((a,b)=>{
            return a.name > b.name ? 1:-1; 
          })
          return {
            ...state, 
            pokemons: aux
          }

          case "ORDER_Z_A": 
          const aux1 = state.pokemons.sort((a,b)=>{
            return a.name < b.name ? 1:-1; 
          })
          return {
            ...state, 
            pokemons: aux1
          }

          case "ORDER_BY_ATTACK_ASCENDENT": 
          const attack = state.pokemons.sort((a,b)=>{
            return a.attack < b.attack ? 1:-1; 
          })
          return {
            ...state,
            pokemons: attack
          } 

          case "ORDER_BY_ATTACK_DESCENDENT": 
          const attack2 = state.pokemons.sort((a,b)=>{
            return a.attack > b.attack ? 1:-1; 
          })
          return {
            ...state,
            pokemons: attack2
          } 

          case "CREATED": 
          const create1 = state.allpokemons.filter((a)=>
            typeof(a.id) !== "number"
          ) 
          //console.log(create1)
          return {
            ...state,
            pokemons: create1
          }

          case "EXISTING": 
          const create2 = state.allpokemons.filter((a)=>
            typeof(a.id) === "number"
          ) 
          //console.log(create1)
          return {
            ...state,
            pokemons: create2,
            paginaactual: 1
          }

          case "GET_FILTER": 
          //console.log(action.payload)
          if(action.payload === "all"){
            return {...state,
            pokemons: state.allpokemons}
          }
          const filtrado = state.allpokemons.filter((e) =>
          e.types.some((t) => t.name === action.payload)
        );
        
          console.log(filtrado)
           return {
              ...state, 
              pokemons: filtrado,
              paginaactual: 1
            };

           case "CAMBIAR_PAGINA": 
           return {...state,
          paginaactual: action.payload} 
          
          default:
            return { ...state };
        }
      };
    export default rootReducer;