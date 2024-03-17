import { useState, useEffect } from 'react';
import { number } from 'prop-types';

import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorImg from '../error/Error';
import Spiner from '../spiner/Spiner';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.selectedCharID])

    const onCharLoaded = (char) => {
        setChar(char);
        setLoaded(true);
    }

    const onCharLoading = () => {
        setLoaded(false);
    }

    const onError = () => {
        setLoaded(true);
        setError(true);
    }

    const updateChar = () => {
        const { selectedCharID } = props;
        if (!selectedCharID) {
            return
        }

        onCharLoading();
        marvelService.getCharacterData(selectedCharID)
            .then(onCharLoaded)
            .catch(onError)
    }

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

CharInfo.propTypes = {
    selectedCharID: number
}

export default CharInfo;