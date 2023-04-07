import { Link } from "react-router-dom";

const ComicsListItem = ({item}) => {
    console.log('render...');
    let imgClass = item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? " not-found" : "";
    return (
        <li className="comics__item">
            <Link to={`/comics/${item.id}`}>
                <img src={item.thumbnail} alt={item.title} className={"comics__item-img" + imgClass}/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
            </Link>
        </li>
    )
}

export default ComicsListItem