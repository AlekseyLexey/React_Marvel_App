import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorImg from '../error/Error';
import Spiner from '../spiner/Spiner';

class CharList extends Component {

    state = {
        list: [],
        loaded: false,
        error: false,
        offset: 210,
        charEnded: false,
        newItemsLoading: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters().then(this.onListLoaded).catch(this.onError)
    }

    onListLoaded = (newList) => {

        if (newList.length < 9) {
            this.setState({ charEnded: true })
        }

        this.setState(({list, offset}) => ({
            list: [...list, ...newList],
            loaded: true,
            offset: offset + 9,
            newItemsLoading: false
        }))
    }

    onError = () => {
        this.setState({loaded: true, error: true});
    }

    onListLoading = () => {
        this.setState({newItemsLoading: true})
    }

    renderList = (list) => {
        if (!list) {
            return
        }

        const items = list.map(item => {
            return (
                <li className="char__item" key={item.id} onClick={() => this.props.onSelectedChar(item.id)}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

        // char__item_selected
    }

    refreshingList = (offset) => {
        this.onListLoading()
        this.marvelService.getAllCharacters(offset).then(this.onListLoaded).catch(this.onError)
    }


    render() {
        const { list, loaded, error, offset, charEnded, newItemsLoading } = this.state;

        const items = this.renderList(list);

        const errorItem = error ? <ErrorImg/> : null;
        const loadedItem = !loaded ? <Spiner/> : null;
        const listItems = !(error || !loaded) ? items : null;

        return (
            <div className="char__list">
                {errorItem}
                {loadedItem}
                {listItems}
                <button className="button button__main button__long"
                    onClick={() => this.refreshingList(offset)}
                    disabled={ newItemsLoading }
                    style={{display: charEnded ? 'none' : 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;