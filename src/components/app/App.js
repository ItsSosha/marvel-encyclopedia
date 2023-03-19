import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, NotFound, ComicsPage, ComicsList, ComicDetails } from "../pages";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path={"/"} element={<MainPage />} />
                        <Route path={"/comics"} element={<ComicsPage />}>
                            <Route index element={<ComicsList />}/>
                            <Route path=":id" element={<ComicDetails />}/>
                        </Route>
                        <Route path={"*"} element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}  


export default App;