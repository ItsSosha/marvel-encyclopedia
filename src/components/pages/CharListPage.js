import './charList.scss';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import useMarvelService from '../../hooks/useMarvelService';
import { CharListItem } from '../charListItem/CharListItem';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import setContent from '../../utils/setContent';

const CharListPage = ({onCharClick}) => {

    const {getAllCharacters, clearError, process, setProcess} = useMarvelService();

    const [characters, setCharacters] = useState([]);
    const {page} = useParams();
    const navigate = useNavigate();
    const charRefs = useRef([]);

    const updateCharacters = (page) => getAllCharacters(9, (page - 1) * 9)
        .then(result => {
            clearError();
            setCharacters(result.map((elem, i) => {
                return (
                    <CharListItem key={elem.id} 
                    name={elem.name} 
                    thumbnail={elem.thumbnail} 
                    onCharClick={() => {
                        onCharClick(elem.id);
                        focusOnChar(i);
                    }}
                    onKeyPress={e => {
                        if (e.key == 'Enter') {
                            onCharClick(elem.id);
                            focusOnChar(i);
                        }
                    }}
                    ref={el => charRefs.current[i] = el} />
                );
            }));
        })
        .then(() => setProcess('success'));

    const focusOnChar = (id) => {
        charRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        charRefs.current[id].classList.add('char__item_selected');
        charRefs.current[id].focus();
    }

    useEffect(() => {
        if (isNaN(+page)) {
            navigate("/");
        }
        updateCharacters(page);
      }, [page]);

    const items = useMemo(() => {
        return setContent(process, View, characters, false);
    }, [process]);
    
    return (
        <div className="char__list">
            {items}
            <div className='d-flex flex-row'>
                <Link className="button button__main button__long"
                    to={`/characters/${+page && +page - 1 !== 0 ? +page - 1 : 1}`}>
                    <div className="inner">Prev page</div>
                </Link>
                <Link className="button button__main button__long"
                    to={`/characters/${+page ? +page + 1 : 2}`}>
                    <div className="inner">Next page</div>
                </Link>
            </div>
        </div>
    )
}

const View = ({data}) => {
    return (
        <ul className="char__grid">
            {data}
        </ul>
    )
}

export default CharListPage;