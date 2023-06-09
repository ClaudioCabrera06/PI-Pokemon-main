import style from "./Detail.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemon, cleanDetail, getPath } from "../../redux/actions";
import ProgressHp from "../../components/ProgressBar/ProgressHp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProgressDefense from "../../components/ProgressBar/ProgressDefense";
import ProgressAttack from "../../components/ProgressBar/ProgressAttack";
import ProgressSpeed from "../../components/ProgressBar/ProgressSpeed";
import ProgressHeight from "../../components/ProgressBar/ProgressHeight";
import ProgressWeight from "../../components/ProgressBar/ProgressWeight";

import { Link } from "react-router-dom"

function Detail () {
    let {id} = useParams();
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getPokemon(id))
        return () => {
            dispatch(cleanDetail())  ;
        }
    },[dispatch, id])
    const data = useSelector(state => state.pokemonDetail);

    return(
        <div className={style.container}>
            <div style={{position: "relative"}}>
                <div style={{position: "absolute", right: "30px"}}>
                </div>
                <h1>DETAIL POKEDEX #{data.id}</h1>
            </div>
            <hr style={{margin:"0"}}/>
            <div style={{display: "flex"}}>
                <div className={style.box1}>
                    <div style={{left: "100px"}}>
                        <h2>{data.name}</h2>
                    </div>
                    <div>
                    <img src={data.image} alt={data.name} className={style.img} />
                    </div>
                    <div style={{bottom: "-50px", left: "150px"}}>
                        <h4>{data.type1}</h4>
                    </div>
                    <div style={{bottom: "-50px", right: "100px"}}>
                        <h4>{data.type2}</h4> 
                    </div>
                </div>
               
                <div className={style.box2}>
                    <div>
                        <h3>STACS</h3>
                    </div>
                    <div style={{width:"100%", height: "100%", display: "flex", justifyContent:"center"}}>
                        <div style={{width:"100%", height: "100%"}}> 
                            <div style={{margin: "30px"}}>
                                <ProgressHp/>
                            </div> 
                            <hr/>
                            <div style={{margin: "30px"}}>
                                <ProgressAttack/>
                            </div>
                            <hr/>
                            <div style={{margin: "30px"}}>
                                <ProgressDefense/>
                            </div>
                            <hr/>
                            <div style={{margin: "30px"}}>
                                <ProgressSpeed/>
                            </div>
                            <hr/>
                            <div style={{margin: "30px"}}>
                                <ProgressHeight/>
                            </div>  
                            <hr/>
                            <div style={{margin: "30px"}}>
                                <ProgressWeight/>
                            </div> 
                            <Link to="/home">
                                <button className={style.button}>
                                    Back Home 
                                </button>
                            </Link>
                        </div>                         
                    </div>
                </div>
            </div>
        </div>    
    )
};

export default Detail;