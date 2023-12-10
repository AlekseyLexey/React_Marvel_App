import { Component } from 'react';

import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorImg from '../error/Error';
import Spiner from '../spiner/Spiner';

class CharInfo extends Component {

    state = {
        char: null,
        loaded: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedCharID !== prevProps.selectedCharID) {
            this.updateChar();
        }
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

    updateChar = () => {
        const { selectedCharID } = this.props;
        if (!selectedCharID) {
            return
        }

        this.onCharLoading();
        this.marvelService.getCharacterData(selectedCharID)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {

        const { char, loaded, error } = this.state;

        const skeleton = char || !loaded || error ? null : <Skeleton/>
        const errorItem = error ? <ErrorImg/> : null;
        const loadedItem = !loaded ? <Spiner/> : null;
        const content = !(error || !loaded || !char) ? <View char={ char }/> : null;

        return (
            <div className="char__info">
                { skeleton }
                { errorItem }
                { loadedItem }
                { content }
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, decription, thumbnail, homepage, wiki, comics } = char;
    const styleObjFit = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? 'contain' : 'cover';

    const comicsContent = (function createContent(comics) {
        if (!comics.length) {
            return "There is no comics with this character"
        }

        const content = [];

        for (let i = 0; i < comics.length; i++) {
            if (i === 10) {
                break;
            }

            content.push((
                <li key={ i } className="char__comics-item">
                    { comics[i].name }
                </li>
            ))
        }

        return content
    })(comics)

    return (
        <>
            <div className="char__basics">
                <img src={ thumbnail } alt={ name } style={{'objectFit': `${styleObjFit}`}}/>
                <div>
                    <div className="char__info-name">{ name }</div>
                    <div className="char__btns">
                        <a href={ homepage } className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={ wiki } className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {decription ? decription : 'No decription :('}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                { comicsContent }
            </ul>
        </>
    )
}

export default CharInfo;