import { forwardRef } from "react";

const CharListItem = forwardRef(({name, thumbnail, onCharClick, onKeyPress}, ref) => {

    let imgClass = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? "not-found" : "";
    return (
        <li 
            className="char__item" 
            onClick={onCharClick}
            onKeyDown={onKeyPress} 
            ref={ref}
            tabIndex={0}>
            <img className={imgClass} src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
})

export {CharListItem}