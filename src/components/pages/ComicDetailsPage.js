import './comicDetails.scss';
import xMen from '../../resources/img/x-men.png';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../hooks/useMarvelService';
import { CircularProgress } from '@mui/material';

const ComicDetails = () => {

    const [comic, setComic] = useState(null);
    const { id } = useParams();
    const {loading, error, getComicsById, clearError} = useMarvelService(); 


    // const spinner = loading ? <CircularProgress /> : null
    return (
        <div className="single-comic">
            {/* {spinner} */}
            <img src={xMen} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
                <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">9.99$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default ComicDetails;