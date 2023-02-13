

const CharListItem = ({name, description, thumbnail, homepage, wiki, onCharClick}) => {
    return (
        <li className="char__item" onClick={onCharClick}>
        <img src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}

export {CharListItem}