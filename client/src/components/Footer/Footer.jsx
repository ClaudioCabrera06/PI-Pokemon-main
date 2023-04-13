import React from "react";
import "../Footer/Footer.module.css"
import style from "./Footer.module.css";

export default function Footer (){
    return (
        <div className={style.footer}>
            <p className={style.yo}>Claudio Fabio Cabrera</p>
            <p className={style.yo}>Cohorte: FT-33B</p>
            <button className={style.boton}>Linkedin</button>
        </div>
    )
}