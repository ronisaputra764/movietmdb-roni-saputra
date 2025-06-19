import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
                },
                params: { language: 'en-US' },
            });

            setMovie(response.data);
        };

        fetchMovie();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="p-4 text-white max-w-[900px] mx-auto pt-[100px]">
            <button onClick={() => navigate(-1)} className="mb-4 bg-gray-600 px-4 py-2 rounded">
                ← Back
            </button>
            <div className="flex flex-col md:flex-row gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="mt-2">Release Date: {movie.release_date}</p>
                    <p>Rating: {movie.vote_average} / 10</p>
                    <p className="text-gray-300 mt-2">{movie.overview}</p>
                </div>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} className="w-[700px] rounded-xl" />

            </div>
        </div>
    );
};

export default MovieDetail;
