import './comicDetails.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import useMarvelService from '../../hooks/useMarvelService';
import { setContent } from '../../utils';

const ComicDetails = () => {

    const [comic, setComic] = useState(null);
    const { id } = useParams();
    const {getComicsById, clearError, process, setProcess} = useMarvelService(); 

    const onLoadComic = () => {
        getComicsById(id)
        .then(onComicLoaded)
        .then(() => setProcess('success'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic[0]);
    }

    useEffect(() => {
        onLoadComic();
    }, [])

    const items = useMemo(() => {
        return setContent(process, View, comic, false);
    })
    
    return (
        <>
            {items}
        </>
    )
}

const View = ({data}) => {
    let imgClass = data.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? " not-found" : "";
    return (
        <div className="single-comic">
            <img src={data.thumbnail} alt="x-men" className={"single-comic__img" + imgClass}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{data.title}</h2>
                <p className="single-comic__descr">{data.description}</p>
                <p className="single-comic__descr">{data.pageCount} pages</p>
                <p className="single-comic__descr">Language: {data.language}</p>
                <div className="single-comic__price">{data.price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default ComicDetails;