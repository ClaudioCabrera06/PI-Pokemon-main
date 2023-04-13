import { useDispatch } from "react-redux";
import style from "./NavBar.module.css"
import { useState } from "react";
import { getPokemonName } from "../../redux/actions"


function NavBar () {

    const [name, setName] = useState("")
   
    const handleInputChange =(event)=>{
       const value = event.target.value
       setName(value)
     };   

 
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if(name.length === 0){
            return alert("Introducir Un Pokemon")
        } else {
            e.preventDefault()
            dispatch(getPokemonName(name));
            setName("");
        }
   };

    return(
        <div className={style.navbar}>
           <div className={style.searchbar}>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleInputChange}></input>
                </form>
                </div>
           </div>
    )
};

export default NavBar;

