import { useEffect,useState } from "react"
import './App.css'

import MovieCard from "./MovieCard"

import SearchIcon from './assets/search.svg'

const API_URL = `http://www.omdbapi.com?apikey=${import.meta.env.VITE_API_KEY}`;

const App = () => {
  
  //setea las peliculas
  const[movies,setMovies] = useState([]);

  //fetch movies
  const searchMovies = async (title) => { //palabra clave para busqueda, devuelve arreglo de peliculas

    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search)

  }
  useEffect(()=>{//se ejecuta cuando se inicia la app
    
    searchMovies("cars");
  
  }, []);
  
  //setea el termino de busqueda
  const [searchTerm,setSearchTerm] = useState('')
  
  return (
    <>

      <div className="app">

        <h1>Movie Land</h1>

        <div className="search">
          
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />

        </div>

        { // mapeo de las peliculas
          movies.length > 0 ? (
            <div className="container">
              {movies.map((aMovie) => (<MovieCard movie={aMovie}/>))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }

      </div>

    </>
  )
}

export default App
