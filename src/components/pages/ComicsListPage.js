import {useState, useEffect} from 'react';
import useMarvelService from '../../hooks/useMarvelService';
import { CircularProgress } from '@mui/material';
import { Link, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import Error from "../error/error";

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [request, setRequest] = useState(false);
    
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onInitialLoad();
    }, [])

    const onInitialLoad = () => {
        setRequest(true);
        if (!searchParams.get("loadMore")) {
            setSearchParams({loadMore: 0});
            getAllComics(8)
            .then(onComicsListLoaded)
        } else {
            const load = +searchParams.get("loadMore");
            getAllComics(load + 8)
            .then(onComicsListLoaded)
        }
    }

    const onLoadComics = () => {
        setRequest(true);
        console.log(searchParams.get("loadMore"));
        setSearchParams(prevParams => ({
            loadMore: +prevParams.get("loadMore") + 8
        }))
        getAllComics(8, offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setRequest(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }


    function renderItems (arr) {
        const items = arr.map((elem, i) => {
            let imgClass = elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? "not-found" : "";
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${elem.id}`}>
                        <img src={elem.thumbnail} alt={elem.title} className={"comics__item-img " + imgClass}/>
                        <div className="comics__item-name">{elem.title}</div>
                        <div className="comics__item-price">{elem.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const spinner = loading ? <CircularProgress color="success" style={{display: "block", margin: "20px auto 0"}}/> : null;
    const errorMessage = error ? <Error /> : null;
    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMessage}
            <button 
                disabled={comicsEnded || request} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onLoadComics()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;