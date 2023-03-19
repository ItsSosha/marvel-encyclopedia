import './charList.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import abyss from '../../resources/img/abyss.jpg';
import useMarvelService from '../../hooks/useMarvelService';
import { CharListItem } from '../charListItem/CharListItem';
import { useState } from 'react';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const CharList = ({onCharClick}) => {

    const {loading, error, getAllCharacters} = useMarvelService();

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(0);

    const updateCharacters = (page) => getAllCharacters(9, page * 9)
        .then(result => {
            setCharacters(result.map(elem => {
                return (
                    <CharListItem key={elem.id} name={elem.name} thumbnail={elem.thumbnail} onCharClick={() => onCharClick(elem.id)} />
                );
            }));
            return result;
        })

    const turnPage = (dir) => {
        if (page == 0 && !dir || loading) {
            return;
        }

        const promise = dir ? updateCharacters(page + 1) : updateCharacters(page - 1);
        promise.then(result => {
                if (dir) {
                    setPage(prevPage => prevPage + 1);
                } else {
                    setPage(prevPage => prevPage - 1);
                }
            }
        );
    }

    useEffect(() => {
        updateCharacters(page);
      }, []);

    const loadingSpinner = loading ? <CircularProgress color='success' style={{display: "block", margin: "20px auto 0"}}/> : null
    return (
        <div className="char__list">
            {loadingSpinner}
            {!loading && !error ? <View characters={characters}/> : null}

            <div className='d-flex flex-row'>
                <button className="button button__main button__long"
                    onClick={() => turnPage()}>
                    <div className="inner">Prev page</div>
                </button>
                <button className="button button__main button__long"
                    onClick={() => turnPage(true)}>
                    <div className="inner">Next page</div>
                </button>
            </div>
        </div>
    )
}

const View = ({characters}) => {
    return (
        <div className="char__list">

            <ul className="char__grid">
                {characters}
            </ul>
        </div>
    )
}

export default CharList;