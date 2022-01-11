import React from 'react';
// Config
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Spinner from './Spinner';
// Hooks
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';
import Thumb from './Thumb';
import SearchBar from './SearchBar';
import Button from './Button';

const Home = () => {
    
    const { state, loading, error, setSearchTerm, searchTerm, setLoadMore } = useHomeFetch();

    console.log(state, loading, error);

    if(error) return <div>Somthing Went Wrong...</div>

    return (<>
        {!searchTerm && state.results[0] ? (
        <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
            title={state.results[0].original_title} 
            text={state.results[0].overview} /> )
        : null}

        <SearchBar setSearchTerm={setSearchTerm} />

        <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>           
            {state.results.map(movie => (<div key={movie.id}>
                <Thumb 
                    clickable
                    image={movie.poster_path ?
                        IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                        : NoImage
                    }
                    movieID={movie.id}
                />
                <p>{movie.title}</p>
            </div>))}            
        </Grid>
        {loading && (<Spinner />)}
        {state.page < state.total_pages && !loading && (
            <Button text='Load More' callback={() => setLoadMore(true)} />
        )}
    </>);
}

export default Home;