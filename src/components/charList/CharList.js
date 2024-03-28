import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorImg from '../error/Error';
import Spiner from '../spiner/Spiner';
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);

    const refList = useRef([]);

    const { error, loaded, getAllCharacters } = useMarvelService();

    useEffect(() => {
        getAllCharacters().then(onListLoaded);
    }, [])

    const setRefList = (elem, i) => {
        refList.current[i] = elem;
    }

    const onCharFocus = index => {
        refList.current.forEach(item => item.className = 'char__item')
        refList.current[index].className = 'char__item char__item_selected'
        refList.current[index].focus()
    }

    const onListLoaded = (newList) => {

        if (newList.length < 9) {
            setCharEnded(true)
        }

        setList(list => [...list, ...newList]);
        setOffset(offset => offset + 9);
        setNewItemsLoading(false)
    }

    const onListLoading = () => {
        setNewItemsLoading(true);
    }

    const renderList = (list) => {
        if (!list) {
            return
        }

        const items = list.map((item, index) => {
            return (
                <li className="char__item" ref={elem => setRefList(elem, index)} key={item.id}
                    tabIndex={0}
                    onClick={() => {
                        props.onSelectedChar(item.id)
                        onCharFocus(index)
                    }}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            props.onSelectedChar(item.id)
                            onCharFocus(index)
                        }
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const refreshingList = (offset) => {
        onListLoading()
        getAllCharacters(offset).then(onListLoaded)
    }

    const items = renderList(list);

    const errorItem = error ? <ErrorImg /> : null;
    const loadedItem = !loaded ? <Spiner /> : null;

    return (
        <div className="char__list">
            {errorItem}
            {loadedItem}
            {items}
            <button className="button button__main button__long"
                onClick={() => refreshingList(offset)}
                disabled={newItemsLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;