import { useState, useEffect } from 'react';

//API
import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [loadMore, setLoadMore] = useState(false);

    const fetchData = async (page, searchTerms = '') => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerms, page);

            setState(prev => ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))

        } catch (error) {
            setError(true);
        }

        setLoading(false);
    }

    // Initial Render & Search
    useEffect(() => {
        setState(initialState);
        fetchData(1, searchTerm);
    }, [searchTerm]);

    // Loading More Movies
    useEffect(() => {
        if(!loadMore) return;

        fetchData(state.page + 1, searchTerm);
        setLoadMore(false);

    }, [loadMore, searchTerm, state.page])

    return { state, loading, error, setSearchTerm, searchTerm, loadMore, setLoadMore }
}