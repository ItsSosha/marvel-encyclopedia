import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";
import decoration from '../../resources/img/vision.png';

const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(result => console.log(result))

const App = () => {
    const characters = marvelService.getAllCharacters().then(result => {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList />
                        <CharInfo/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    });
}

export default App;