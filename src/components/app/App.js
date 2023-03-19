import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";
import decoration from '../../resources/img/vision.png'; 
import Skeleton from '../skeleton/Skeleton'
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList"
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => {

    const [charId, setCharId] = useState(null);

    const onCharSelected = id => {
        setCharId(id);
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path={"/"}>
                            <RandomChar/>
                            <div className="char__content">
                                <CharList onCharClick={onCharSelected} />
                                <CharInfo char={charId} />
                            </div>
                            <img className="bg-decoration" src={decoration} alt="vision"/>
                        </Route>
                        <Route exact path={"/comics"}>
                            <AppBanner/>
                            <ComicsList />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}


export default App;