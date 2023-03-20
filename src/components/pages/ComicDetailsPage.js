import './comicDetails.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../hooks/useMarvelService';
import { CircularProgress } from '@mui/material';
import Error from "../error/error";

const ComicDetails = () => {

    const [comic, setComic] = useState(null);
    const { id } = useParams();
    const {loading, error, getComicsById, clearError} = useMarvelService(); 

    const onLoadComic = () => {
        getComicsById(id)
        .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic[0]);
    }

    useEffect(() => {
        onLoadComic();
    }, [])

    const spinner = loading ? <CircularProgress 
        color='success'
        style={{display: "block", margin: "20px auto 0", height: "100px", width: "100px"}}/> : null;
    const errorMessage = error ? <Error /> : null;
    const content = (!loading && !error) ? <View comic={comic} /> : null;
    
    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comic}) => {
    let imgClass = comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? " not-found" : "";
    return (
        <div className="single-comic">
            <img src={comic.thumbnail} alt="x-men" className={"single-comic__img" + imgClass}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount} pages</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">{comic.price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default ComicDetails;