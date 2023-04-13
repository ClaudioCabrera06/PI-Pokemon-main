import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../redux/actions';
import style from './SearchBar.module.css' 


export default function SearchBar() {
   const [name, setName] = useState("")
   
   const handleInput =(event)=>{
      const value = event.target.value
      setName(value)
    };   

   const dispatch = useDispatch();
   const onSearch = (name) => {
      dispatch(getPokemonName(name));
      setName("");
  };
  
   return (
      <div className={style.container}>
         <input
         placeholder='   Name' 
         type="text" 
         name="search"  
         onChange={(e)=>handleInput(e)} 
         value={name}/>
         <button type="submit" onClick={() => onSearch(name)}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0014 9a6.5 6.5 0 00-13 0 6.5 6.5 0 004.47 6.18l.28.27v.55l4.54 4.54a1.5 1.5 0 102.12-2.12L6.12 14h-.79a1.5 1.5 0 100 3h9.18a1.5 1.5 0 100-3z"/>
       </svg>
         </button>
      </div>
   );
}
