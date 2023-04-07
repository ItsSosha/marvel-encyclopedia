import ComicsListItem from '../comicsListItem/comicsListItem';
import {useState, useEffect} from 'react';
import useMarvelService from '../../hooks/useMarvelService';
import { useSearchParams } from 'react-router-dom';
import { setLoadingContent } from '../../utils';
import './comicsList.scss';

const ComicsListPage = () => {

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [request, setRequest] = useState(false);
    
    const [searchParams, setSearchParams] = useSearchParams();

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onInitialLoad();
    }, [])

    const onInitialLoad = () => {
        setRequest(true);
        if (!searchParams.get("loadMore")) {
            setSearchParams({loadMore: 0});
            getAllComics(8)
            .then(onComicsListLoaded)
            .then(() => setProcess('success'))
        } else {
            const load = +searchParams.get("loadMore");
            getAllComics(load + 8)
            .then(onComicsListLoaded)
            .then(() => setProcess('success'))
        }
    }

    const onLoadComics = () => {
        setRequest(true);
        setSearchParams(prevParams => ({
            loadMore: +prevParams.get("loadMore") + 8
        }))
        getAllComics(8, offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('success'))
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
            return (
                <ComicsListItem item={elem} key={i}/>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }


    return (
        <div className="comics__list">
            {setLoadingContent(process, () => renderItems(comicsList), null, false)}
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

export default ComicsListPage;

