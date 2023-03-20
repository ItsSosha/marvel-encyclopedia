import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharInfo from "../charInfo/CharInfo";
import CharListPage from "./CharListPage";
import decoration from "../../resources/img/vision.png"

export default function MainPage() {
    const [charId, setCharId] = useState(null);

    const onCharSelected = id => {
        setCharId(id);
    }

    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharListPage onCharClick={onCharSelected} />
                <CharInfo char={charId} />
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}