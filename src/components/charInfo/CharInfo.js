import { useState, useEffect, useMemo } from 'react';
import { number } from 'prop-types';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import ErrorImg from '../error/Error';
import Spiner from '../spiner/Spiner';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { error, loaded, getCharacterData } = useMarvelService();

    const scelet = useMemo(() => {
        return props.selectedCharID ? 0 : 1
    }, [props.selectedCharID])

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.selectedCharID])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const { selectedCharID } = props;
        if (!selectedCharID) {
            return
        }

        getCharacterData(selectedCharID)
            .then(onCharLoaded)
    }

    const skeleton = scelet ? <Skeleton /> : null
    const errorItem = error ? <ErrorImg /> : null;
    const loadedItem = (!scelet && !loaded) ? <Spiner /> : null;
    const content = !(error || !loaded || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorItem}
            {loadedItem}
            {content}
        </div>
    )
}

const View = ({ char }) => {
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
                <li key={i} className="char__comics-item">
                    {comics[i].name}
                </li>
            ))
        }

        return content
    })(comics)

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{ 'objectFit': `${styleObjFit}` }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
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
                {comicsContent}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    selectedCharID: number
}

export default CharInfo;