import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, 
        method = 'GET', 
        body = null,
        headers = {
            'Content-type': 'application/json'
        }) => {
            try {
                setLoading(true);
                setProcess('loading'); 

                const res = await fetch(url, {method, body, headers});
                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`)
                } 
                const data = await res.json();
                return data;
            } catch(e) {
                setError(e.message);
                // setLoading(false);
                setProcess('failure');
            }
        }, []);
    
    const clearError = useCallback(() => {
        setError(false);
        setProcess('loading');
    }, []);

    return {loading, error, request, clearError, process, setProcess};
 }

 export {useHttp}
