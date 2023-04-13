import './App.css';
import { Route, Routes } from "react-router-dom";
import Landing from '../src/views/Landing/Landing';

import Home from "../src/views/Home/Home"
import Detail from "../src/views/Detail/Detail"

import Form from "../src/views/Form/Form"
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route exact path='/home' element={<Home/>}/>
      <Route exact path='/detail/:id' element={<Detail/>}/>
      <Route exact path='/create' element={<Form/>}/>
      <Route exact path="/" element={<NavBar/>}/>
      </Routes>
    </div>
  );
}

export default App;
