import './charList.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import { CharListItem } from '../charListItem/CharListItem';
import { useState } from 'react';
import { useEffect } from 'react';

const CharList = ({onCharClick}) => {

    const marvelService = new MarvelService();

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(0);
    const [request, setRequest] = useState(false)

    const updateCharacters = (page) => marvelService.getAllCharacters(9, page * 9)
        .then(result => {
            setCharacters(result.map(elem => {
                return (
                    <CharListItem key={elem.id} name={elem.name} thumbnail={elem.thumbnail} onCharClick={() => onCharClick(elem.id)} />
                );
            }));
            return result;
        })

    const turnPage = (dir) => {
        if (page == 0 && !dir || request) {
            return;
        }

        const promise = dir ? updateCharacters(page + 1) : updateCharacters(page - 1);
        setRequest(true);
        promise.then(result => {
                if (dir) {
                    setPage(prevPage => prevPage + 1);
                } else {
                    setPage(prevPage => prevPage - 1);
                }
                setRequest(false);
            }
        );
    }

    useEffect(() => {
        updateCharacters(page);
      }, []);


    return (
        <div className="char__list">
            <ul className="char__grid">
                {characters}
            </ul>
            {/* <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button> */}
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

export default CharList;