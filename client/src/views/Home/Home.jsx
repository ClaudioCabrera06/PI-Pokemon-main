import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer"
import styles from "../Home/Home.module.css"
import Paginado from "../../components/Paginado/Paginado";
import { Link } from "react-router-dom"; 

import Filtered from "../../components/Filtered/Filtered";

    function Home () {
//___________________________________________________________________________________________ 
        const {allpokemons, pokemons, cache, paginaactual} = useSelector(state => state);

        //console.log(pokemons)

        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getPokemons());
        }, []);
      
//__________________________________PAGINADO_________________________________________________
const pokemonsPerPage = 10;
const indexLastPokemon = paginaactual * pokemonsPerPage ;
const indexFirstPokemon = indexLastPokemon - pokemonsPerPage ;
const pokemonsCurrentPage = pokemons.slice(indexFirstPokemon, indexLastPokemon); 

// Cetea la pagina 1 
const pagedNumber = (page) => {
    dispatch({
        type: "CAMBIAR_PAGINA", 
        payload: page
    })
};


//_____________________________________RENDERIZADO____________________________________________       
        return( <div>
                <div>
                <div>
                    <Filtered className={styles.cartas}></Filtered>
                </div>
  <Paginado pokemonsPerPage={pokemonsPerPage} pagedNumber={pagedNumber} allPokemons={pokemons.length} />
                    <div className={styles.cartas}>
                        {pokemonsCurrentPage.map(e => {
                            return (
                                <Link to={'/detail/' +e.id} key={e.id}>
                                    <Card 
                                    id={e.id}
                                    name={e.name}
                                    type1={e.type1}
                                    image={e.image}
                                    type2={e.type2}
                                    />
                                </Link>
                            )
                        })}
                   </div>
                    </div>
                    <div className="paginadoContainer">
  <Paginado pokemonsPerPage={pokemonsPerPage} pagedNumber={pagedNumber} allPokemons={pokemons.length}/>
         </div>
         <Footer></Footer>
            </div>
        )
    };

    export default Home;

    
    