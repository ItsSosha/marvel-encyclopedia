

const CharListItem = ({name, description, thumbnail, homepage, wiki, onCharClick}) => {

    let imgClass = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? "not-found" : "";

    return (
        <li className="char__item" onClick={onCharClick}>
            <img className={imgClass} src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export {CharListItem}