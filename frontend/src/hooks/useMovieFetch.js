import { useState, useEffect } from "react";
//API
import API from '../API';
//Helpers
import { isPersistedState } from '../helpers';

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

        const sessionState = isPersistedState(movieID);

        if(sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }
        fetchData();

    }, [movieID]);

    //Send to session state
    useEffect(() => {
        sessionStorage.setItem(movieID, JSON.stringify(state));
    }, [movieID, state])

    return {state, loading, error}
}