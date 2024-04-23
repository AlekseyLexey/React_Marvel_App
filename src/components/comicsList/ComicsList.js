import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spiner from '../spiner/Spiner';
import ErrorImg from '../error/Error';

const ComicsList = () => {
    const [list, setList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const { error, loaded, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset)
    }, [])

    const onRequest = (offset) => {
        setNewItemsLoading(true);
        getAllComics(offset).then(onListLoaded)
    }

    const onListLoaded = (newList) => {

        if (newList.length < 8) {
            setComicsEnded(true);
        }

        setList([...list, ...newList]);
        setOffset(offset + 8);
        setNewItemsLoading(false);
    }

    const renderList = (list) => {
        if (!list) {
            return
        }

        const items = list.map((item, index) => {
            return (
                <li className="comics__item" key={index}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )

        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderList(list);
    const spinner = (!loaded && !list.length) ? <Spiner /> : null;
    const errorItem = error ? <ErrorImg /> : null;


    return (
        <div className="comics__list">
            {spinner}
            {errorItem}
            {items}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemsLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
            >
                <div className="inner">{newItemsLoading ? "loading..." : "load more"}</div>
            </button>
        </div>
    )
}

export default ComicsList;