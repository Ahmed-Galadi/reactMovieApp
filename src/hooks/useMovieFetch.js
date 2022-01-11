import { useState, useEffect } from "react";
import API from '../API';

export const useMovieFetch = movieID => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {

        const fetchData = async() => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieID);
                const credits = await API.fetchCredits(movieID);
                //Fetch Director Only
                const directors = await credits.crew.filter(member => member.job === 'Director');

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })

                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchData();

    }, [movieID])

    return {state, loading, error}
}