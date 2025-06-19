import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie } from './types/Movie';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('now_playing');
  const [mode, setMode] = useState<'search' | 'category'>('category');

  const fetchMovies = async (pageNumber = 1, query?: string, category = 'popular') => {
    try {
      setLoading(true);
      const endpoint = query
        ? 'https://api.themoviedb.org/3/search/movie'
        : `https://api.themoviedb.org/3/movie/${category}`;

      const response = await axios.get<{ results: Movie[] }>(endpoint, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
        params: {
          language: 'en-US',
          page: pageNumber,
          ...(query ? { query } : {}),
        },
      });

      setMovies((prev) => (pageNumber === 1 ? response.data.results : [...prev, ...response.data.results]));

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, undefined, activeCategory);
  }, []);

  const handleSearch = () => {
    setMode('search');
    setPage(1);
    fetchMovies(1, searchTerm);
  };

  const handleCategoryChange = (category: string) => {
    setMode('category');
    setActiveCategory(category);
    setPage(1);
    setSearchTerm('');
    fetchMovies(1, undefined, category);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (mode === 'search') {
      fetchMovies(nextPage, searchTerm);
    } else {
      fetchMovies(nextPage, undefined, activeCategory);
    }
  };

  return (
    <div className="min-h-screen text-white p-4 2xl:w-[80%] w-full mx-auto">
      <Navbar handleCategoryChange={handleCategoryChange} handleSearch={handleSearch} mode={mode} setSearchTerm={setSearchTerm} searchTerm={searchTerm} activeCategory={activeCategory} />

      {loading && movies.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 mt-6 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-103 transform transition"
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && (
        <div className="text-center my-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
