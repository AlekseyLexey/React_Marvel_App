import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharContent from "../charContent/CharContent";


import decoration from '../../resources/img/vision.png';

const App = () => {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <CharContent />
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App;