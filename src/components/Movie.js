import React from 'react';
import { useParams } from 'react-router-dom';
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Component
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb'
import MovieInfo from './MovieInfo'
//Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
//Image
import NoImage from '../images/no_image.jpg'
import MovieInfoBar from './MovieInfoBar';


const Movie = () => {

    const { movieID } = useParams();
    const {state: movie, loading, error} = useMovieFetch(movieID);
    console.log(movie)
    if(loading) return <Spinner/>
    if(error) return <div>Something Went Wrong...</div>

    return (
    <div>
        <BreadCrumb movieTitle={movie.original_title} />
        <MovieInfo movie={movie} />
        <MovieInfoBar />
    </div>)
}

export default Movie;