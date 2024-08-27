import { useState } from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';

export type Movie = {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
};

const MoviePage = () => {
  const [query, setQuery] = useState(''); // Just for dummy in the input
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: searchedMovies, // Aliasing with the name searchedMovie
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', searchTerm], // add a unique key and the dependency thing which is the search term
    queryFn: async () => {
      // what u want to fetch
      if (!searchTerm) return [];
      const req = await fetch(
        `http://www.omdbapi.com/?apikey=f84fc31d&s=${searchTerm}`
      );
      const res = await req.json();
      return res.Search || [];
    },
  });

  function handleSubmit() {
    setSearchTerm(query);
    setQuery('');
  }

  return (
    <div className="justify-center items-center">
      <div className="text-3xl text-cyan-300 p-3 mb-3">
        We are in the movies page <br />
      </div>
      <NavLink
        to={'/all_movies'}
        className="bg-cyan-100 text-pretty text-cyan-700  p-2 rounded-lg items-center justify-center"
      >
        Go to Pagination Example
      </NavLink>
      <div className="flex flex-row items-center space-x-4 justify-center">
        <input
          className="p-4 placeholder:text-gray-700 bg-cyan-200 rounded-lg w-full mt-10 overflow-hidden no-underline outline-none hover:bg-cyan-100"
          type="search"
          name="search"
          id="search"
          value={query}
          placeholder="Search here..."
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={handleSubmit}
        />
        <button
          className="mt-10 p-4 bg-cyan-300 rounded-lg hover:bg-cyan-500"
          onClick={handleSubmit}
        >
          <img
            src="https://img.icons8.com/material-outlined/24/ffffff/search--v1.png"
            alt="search icon"
            className="w-6 h-6"
          />
        </button>
      </div>

      {isLoading && <div>Loading...</div>}
      <div className="flex flex-wrap">
        {error && <div>Error loading movies: {(error as Error).message}</div>}

        {searchedMovies?.map((movie: Movie) => (
          <div
            key={movie.imdbID}
            className="p-8 grid-flow-row-dense grid-cols-3"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-52 h-72 overflow-hidden rounded-lg"
            />
            <h1 className="text-lg mt-2 text-ellipsis w-52">
              {movie.Title} ({movie.Year})
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
