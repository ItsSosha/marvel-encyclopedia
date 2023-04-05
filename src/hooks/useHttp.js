import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const request = useCallback(async (url, 
        method = 'GET', 
        body = null,
        headers = {
            'Content-type': 'application/json'
        }) => {
            try {
                setLoading(true);

                const res = await fetch(url, {method, body, headers});
                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`)
                } 
                const data = await res.json();
                setLoading(false);
                return data;
            } catch(e) {
                setError(e.message);
                setLoading(false);
            }
        }, []);
    
    const clearError = useCallback(() => setError(false), []);

    return {loading, error, request, clearError};
 }

 export {useHttp}
