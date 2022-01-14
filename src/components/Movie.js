import React from 'react';
import { useParams } from 'react-router-dom';
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Component
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb'
import MovieInfo from './MovieInfo'
import MovieInfoBar from './MovieInfoBar';
//Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
import Actors from './Actors';
//NoImage
import NoImage from '../images/no_image.jpg';



const Movie = () => {

    const { movieID } = useParams();
    const {state: movie, loading, error} = useMovieFetch(movieID);

    if(loading) return <Spinner/>
    if(error) return <div>Something Went Wrong...</div>

    return (
    <div>
        <BreadCrumb movieTitle={movie.original_title} />
        <MovieInfo movie={movie} />
        <MovieInfoBar
            time={movie.runtime} 
            budget={movie.budget} 
            revenue={movie.revenue} />
        <Grid header='Actors'>
            {movie.actors.map(actor => (
                <Actors key={actor.credit_id}
                        name={actor.name} 
                        character={actor.character}
                        imageUrl={
                            actor.profile_path ?
                            `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        } />))}
        </Grid>
    </div>)
}

export default Movie;