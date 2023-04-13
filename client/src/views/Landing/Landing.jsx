import React from "react";
import { NavLink } from "react-router-dom";
import  style from "../Landing/Landing.module.css"



export default function Landing(){
    return(
        <div className={style.container}>
            <div>
                <NavLink to="/home">
                    <button>HOME</button>
                </NavLink>
                <div className={style.texto}>
                <p>Bienvenido al emocionante mundo de los Pokémon, donde puedes embarcarte en una aventura llena de criaturas fascinantes y desafíos emocionantes.</p>
                </div>
            </div>
        </div>
    )
};

//  <p>Bienvenido al emocionante mundo de los Pokémon, donde puedes embarcarte en una aventura llena de criaturas fascinantes y desafíos emocionantes.</p>
