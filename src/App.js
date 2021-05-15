import { useState, useEffect } from "react";
import Movie from "./components/Movie";

const FEATURED_API = 
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d32be66c4b0d2451e84aca6168c083b4&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=d32be66c4b0d2451e84aca6168c083b4&query=";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /*Hook for fetching data from the API and converting the response into json object and then updating movies with the results.*/
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getMovies(SEARCH_API + searchTerm);
    setSearchTerm("");
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <header>
        <span onClick={() => getMovies(FEATURED_API)}></span>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            placeholder="Search..."
            type="search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <Movie key={movie.id} {...movie} />;
          })}
      </div>
    </div>
  );
};

export default App;
