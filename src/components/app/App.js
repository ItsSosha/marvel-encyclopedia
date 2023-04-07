import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, NotFound, ComicsPage, ComicsListPage, ComicDetails } from "../pages";

const App = () => {

    return (
        <Router basename="marvel-encyclopedia">
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route index element={<MainPage />} />
                        <Route path={"characters/:page"} element={<MainPage />} />
                        <Route path={"comics"} element={<ComicsPage />}>
                            <Route index element={<ComicsListPage />}/>
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