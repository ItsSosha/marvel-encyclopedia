import './charInfo.scss';
import useMarvelService from '../../hooks/useMarvelService';
import Skeleton from '../skeleton/Skeleton';
import { useState } from 'react';
import { useEffect } from 'react';
import Error from '../error/error';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const CharInfo = ({char}) => {

    const {getCharacterById, process, setProcess, clearError} = useMarvelService();

    const [character, setCharacter] = useState(null)

    useEffect(() => {
        if (!char) {
            return;
        }
        clearError();
        getCharacterById(char)
        .then(res => {
            setCharacter(res[0]);
        })
        .then(() => {
            setProcess('success')
        })
    }, [char])

    const setContent = (process, character) => {
        switch (process) {
            case 'waiting':
                return <Skeleton />;
            case 'loading':
                return <CircularProgress color='success' style={{display: "block", margin: "20px auto 0"}}/>;
            case 'success':
                return <View character={character} />;
            case 'failure':
                return <Error />;
            default:
                throw new Error('Unknown process!');
        }
    }

    return (
        <div className="char__info">
            {setContent(process, character)}
        </div>
    )
}

const View = ({character}) => {
    const comics = character.comics.items.map(elem => {
        const parts = elem.resourceURI.split('/');
        const id = parts[parts.length - 1];
        return (
            <li className="char__comics-item">
                <Link to={`/comics/${id}`}>{elem.name}</Link>
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={character.thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{character.name}</div>
                    <div className="char__btns">
                        <a href={character.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={character.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {character.description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics}
            </ul>
        </>
    )
}

export default CharInfo;