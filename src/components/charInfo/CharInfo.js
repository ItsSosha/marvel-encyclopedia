import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const CharInfo = ({char}) => {

    const marvelService = new MarvelService();

    const [character, setCharacter] = useState(null)


    // !!!!!!!
    const isInitialMount = useRef(true);

    useEffect(() => {
      if (isInitialMount.current) {
         isInitialMount.current = false;
      } else {
        marvelService.getCharacterById(char)
        .then(res => {
            setCharacter(res[0]);
        })
      }
    });

    const content = character ? <View character={character}/> : <Skeleton />

    return (
        <div className="char__info">
            {content}
        </div>
    )
}

const View = ({character}) => {
    const comics = character.comics.items.map(elem => {
        return (
            <li className="char__comics-item">
                {elem.name}
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