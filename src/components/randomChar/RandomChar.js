import './randomChar.scss';
import useMarvelService from '../../hooks/useMarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState } from 'react';
import setContent from '../../utils/setContent';

const RandomChar = () => {

    const {getCharacterById, clearError, process, setProcess} = useMarvelService();

    const [character, setCharacter] = useState(null);

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        clearError();

        getCharacterById(id)
            .then(result => {
                setCharacter({...result[0], description: result[0].description ? result[0].description : 'No description provided' });
            })
            .then(() => setProcess('success'));
    }


    return (
        <div className="randomchar">
            {setContent(process, View, character, false)}
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

const View =({data}) => {

    let imgStyle;
    if (data.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'}
    } else {
        imgStyle = {'objectFit': 'cover'}
    }

    return (
        <div className="randomchar__block">
            <img src={data.thumbnail} alt={data.name} className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{data.name}</p>
                <p className="randomchar__descr">
                    {data.description}
                </p>
                <div className="randomchar__btns">
                    <a href={data.homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={data.wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;