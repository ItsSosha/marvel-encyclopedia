import './charList.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import useMarvelService from '../../hooks/useMarvelService';
import { CharListItem } from '../charListItem/CharListItem';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CharListPage = ({onCharClick}) => {

    const {loading, error, getAllCharacters} = useMarvelService();

    const [characters, setCharacters] = useState([]);
    const {page} = useParams();
    const navigate = useNavigate();
    const updateCharacters = (page) => getAllCharacters(9, (page - 1) * 9)
        .then(result => {
            setCharacters(result.map(elem => {
                return (
                    <CharListItem key={elem.id} 
                    name={elem.name} 
                    thumbnail={elem.thumbnail} 
                    onCharClick={() => onCharClick(elem.id)} />
                );
            }));
            return result;
        })

    useEffect(() => {
        if (isNaN(+page)) {
            navigate("/");
        }
        updateCharacters(page);
      }, [page]);

    const loadingSpinner = loading ? <CircularProgress color='success' style={{display: "block", margin: "20px auto 0"}}/> : null;
    
    return (
        <div className="char__list">
            {loadingSpinner}
            {!loading && !error ? <View characters={characters}/> : null}
            <div className='d-flex flex-row'>
                <Link className="button button__main button__long"
                    to={`/characters/${+page && +page - 1 !== 0 ? +page - 1 : 1}`}
                    >
                    <div className="inner">Prev page</div>
                </Link>
                <Link className="button button__main button__long"
                    to={`/characters/${+page ? +page + 1 : 2}`}
                    >
                    <div className="inner">Next page</div>
                </Link>
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

export default CharListPage;