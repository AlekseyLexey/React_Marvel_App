import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';
import ErrorImg from '../error/Error';

class RandomChar extends Component {

    state = {
        char: {
            name: null,
            decription: null,
            thumbnail: null,
            homepage: null,
            wiki: null
        },
        loaded: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter()
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
    }

    onCharLoaded = (char) => {
        return this.setState({char, loaded: true});
    }

    onCharLoading = () => {
        return this.setState({loaded: false});
    }

    onError = () => {
        this.setState({loaded: true, error: true});
    }

    updateCharacter = () => {
        this.onCharLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1010900);

        this.marvelService.getCharacterData(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const {char, loaded, error} = this.state;

        const errorItem = error ? <ErrorImg/> : null;
        const loadedItem = !loaded ? <Spiner/> : null;
        const content = !(error || !loaded) ? <View char={char}/> : null;


        return (
            <div className="randomchar">
                {errorItem}
                {loadedItem}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateCharacter}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, decription, thumbnail, homepage, wiki} = char;
    const styleObjFit = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover';

    return (
        <div className="randomchar__block">
            <img src={ thumbnail } alt="Random character" className="randomchar__img" style={{'objectFit': `${styleObjFit}`}}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{ name }</p>
                <p className="randomchar__descr">{decription ? decription : 'No decription :('}</p>
                <div className="randomchar__btns">
                    <a href={ homepage } className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={ wiki } className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;