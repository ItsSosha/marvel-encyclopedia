

const CharListItem = ({name, description, thumbnail, homepage, wiki }) => {
    return (
        <li className="char__item">
        <img src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
        </li>
    )
}

export {CharListItem}