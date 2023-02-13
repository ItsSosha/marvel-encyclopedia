import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { CircularProgress } from '@mui/material';

const RandomChar = () => {

    const marvelService = new MarvelService();

    const [character, setCharacter] = useState({
        name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null
    });

    const [loading, setLoading] = useState(true);

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoading(true);
        marvelService.getCharacterById(id)
            .then(result => {
                setCharacter({...result[0], description: result[0].description ? result[0].description : 'No description provided' });
                setLoading(false);
            })
    }
    return (
        <div className="randomchar">
            {loading ? <CircularProgress color="success" style={{marginLeft: 25, marginTop: 25}}/> : <View character={character}/>}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )    
}

const View = ({character}) => {
    return (
        <div className="randomchar__block">
            <img src={character.thumbnail} alt={character.name} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{character.name}</p>
                <p className="randomchar__descr">
                    {character.description}
                </p>
                <div className="randomchar__btns">
                    <a href={character.homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={character.wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;