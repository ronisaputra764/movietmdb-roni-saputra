// src/types/Movie.ts
export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    [key: string]: any;
}
