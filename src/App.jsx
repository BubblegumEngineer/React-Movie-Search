import {useState, useEffect} from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
import.meta.env.VITE_OMDB_API_KEY


export default function App() {
  const [movie, setMovie] = useState(null);

  const getMovie = async(searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch(e) {
      console.error(e)
    }
  };

  // This will run on the first render but not on subsequent renders
  useEffect(() => {
    // List of potential random movie titles
    const movies = [
      "Clueless",
      "The Matrix",
      "Inception",
      "The Godfather",
      "The Dark Knight",
      "Pulp Fiction",
      "The Lion King",
      "Coming to America"
    ];

    // Get a random index from the movie array
    const randomIndex = Math.floor(Math.random() * movies.length);

    // Fetch the random movie
    getMovie(movies[randomIndex]);
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}
