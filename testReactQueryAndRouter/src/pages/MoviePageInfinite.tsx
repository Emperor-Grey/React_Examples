import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { Movie } from './MoviePage';

const MoviePageInfinite = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { ref, inView } = useInView(); // TO FIND WHERE WE ARE IN THE CURRENT SCREEN , not using normal ref but using a lib

  const {
    data: searchedMovies,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['movies', searchTerm],
    queryFn: async ({ pageParam = 1 }) => {
      // Hard coding the page at the start the api doesn't provide much things
      if (!searchTerm) return { results: [], total_results: 0 };
      const req = await fetch(
        `http://www.omdbapi.com/?apikey=f84fc31d&s=${searchTerm}&page=${pageParam}`
      );
      const res = await req.json();
      return {
        results: res.Search || [],
        total_results: res.total_results || 0,
      };
    },
    // WE NEED TO PASS ONE EXTRA FUNCTION THAT TELLS HOW TO FETCH NEXT PAGE
    getNextPageParam: (_, page) => {
      const next_page = page.length + 1;
      return next_page;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  function handleSubmit() {
    setSearchTerm(query);
    setQuery('');
  }

  const movies = searchedMovies?.pages?.flatMap((page) => page.results);
  // Here i am simply just getting the results form the total response

  return (
    <div>
      <div className="text-3xl text-cyan-300 p-3">
        We are in the movies page
      </div>
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
      <div className="flex flex-wrap">
        {isError && <div>Error loading movies...</div>}
        {movies?.map((movie: Movie) => (
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
      <div ref={ref}>
        {hasNextPage ? isFetching && <div>Loading...</div> : null}
        {/* // Just for loading indicator dummy div */}
      </div>
    </div>
  );
};

export default MoviePageInfinite;
