import { useState,useEffect,useRef } from "react";
//API
import API from '../API';
//helpers
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results:[],
    total_pages:0,
    total_results:0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchTerm="") => {
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm,page)
            // console.log('movies',movies)

            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results]: [...movies.results]
            }))//setState
        }
        catch(error){
            setError(true)
            console.log('Error:',error)
        }

        setLoading(false)
    } // fetchMovies

    useEffect(()=>{
        fetchMovies(1)
    },[]);

    useEffect(()=>{
        if(!searchTerm){
            const sessionState = isPersistedState('homeState');

            if(sessionState){
                setState(sessionState);
                return;
            }
        }

        setState(initialState)
        fetchMovies(1, searchTerm)
    },[searchTerm]);

    useEffect(()=>{
        if(! isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    },[isLoadingMore, state.page, searchTerm]);

    //Write to session storage
    useEffect(()=>{
        if (!searchTerm) {
            sessionStorage.setItem('homeState',JSON.stringify(state));
        }
    },[searchTerm, state]);

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore}
}