import './appHeader.scss';
import { Link, NavLink, useMatch } from 'react-router-dom';

const AppHeader = () => {
    const match = useMatch('/characters/:page');
    const page = match ? match.params.page : null;
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to={"/"}>
                    <span>Marvel information portal</span>
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink to={page ? `characters/${page}` : ""} className={({isActive}) => isActive ? "active" : ""}>Characters</NavLink></li>
                    /
                    <li><NavLink to={"comics"} className={({isActive}) => isActive ? "active" : ""}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;