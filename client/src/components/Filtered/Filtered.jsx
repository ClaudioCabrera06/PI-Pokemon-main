
import { useState } from "react";
import style from "./Filtered.module.css"
import Form from "../../views/Form/Form";
import {Link } from "react-router-dom"
import NavBar from "../NavBar/NavBar";
import { useDispatch } from "react-redux"
import { getFiltradoTypes } from "../../redux/actions"

function Filtered () {
    const [value, setValue] = useState("");
    const dispatch = useDispatch(); 

    const handleinputButton = (e)=> {
        
        //console.log(e.target.value)
        setValue(e.target.value)
        dispatch(getFiltradoTypes(e.target.value))
    }

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value === "ascName"){    
            dispatch({
                type: "ORDER_A_Z"
            })
        };
        if((e.target.value === "descName")){    
            dispatch({
                type: "ORDER_Z_A"
            })
        };
        if(e.target.value === "ascAttack"){
            dispatch({
                type: "ORDER_BY_ATTACK_ASCENDENT"
            })
        }; 
        if(e.target.value === "descAttack"){
            dispatch({
                type: "ORDER_BY_ATTACK_DESCENDENT"
            })
        };
        if(e.target.value === "created"){
            dispatch({
                type: "CREATED"
            })
        };
        if(e.target.value === "existing"){
            dispatch({
                type: "EXISTING"
            })
        }; 

    };
    

    return(
        <div className={style.container}>
            <div>
                <select onChange={handleInputChange} value={value}>
                    <option value="">Name A-Z</option>
                    <option value="ascName">A-Z</option>
                    <option value="descName">Z-A</option>
                </select>
            </div>
            <div>
                <select onChange={handleInputChange} value={value}>
                    <option value="">Attack</option>
                    <option value="ascAttack">Ascendant</option>
                    <option value="descAttack">Descendant</option>
                </select>
            </div>
            <div>
                <select onChange={handleinputButton}>
                            <option value="">Type</option>
                            <option value="all">All</option>
                            <option value="normal">Normal</option>
                            <option value="flying">Flying</option>
                            <option value="poison">Poison</option>
                            <option value="ground">Ground</option>
                            <option value="bug">Bug</option>
                            <option value="fire">Fire</option>
                            <option value="water">Water</option>
                            <option value="grass">Grass</option>
                            <option value="electric">Electric</option>
                            <option value="fairy">Fairy</option>
                            <option value="fighting">Fighting</option>
                            <option value="rock">Rock</option>
                            <option value="ghost">Ghost</option>
                            <option value="steel">Steel</option>
                            <option value="psychic">Psychic</option>
                            <option value="ice">Ice</option>
                            <option value="dragon">Dragon</option>
                            <option value="dark">Dark</option>
                            <option value="unknown">Unknown</option>
                            <option value="shadow">Shadow</option>
                 </select>
            </div>     
            <div>
                <select onChange={handleInputChange} value={value}>
                    <option value="">Origin</option>
                    <option value="created">Created</option>
                    <option value="existing">Existing</option>
                </select>
            </div>    
            <Link to="/create">
              <button className={style.button}>
              Create Pokemon
              </button>
              </Link>     
              <div>
                <NavBar></NavBar>
              </div>
        </div>
    )
};

export default Filtered