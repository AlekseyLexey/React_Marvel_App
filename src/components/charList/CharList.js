import './charList.scss';
import React, { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorImg from '../error/Error';
import Spiner from '../spiner/Spiner';
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        list: [],
        loaded: false,
        error: false,
        offset: 210,
        charEnded: false,
        newItemsLoading: false
    }

    refList = [];

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters().then(this.onListLoaded).catch(this.onError)
    }

    setRefList = elem => {
        this.refList.push(elem)
    }

    onCharFocus = index => {
        this.refList.forEach(item => item.className = 'char__item')
        this.refList[index].className = 'char__item char__item_selected'
        this.refList[index].focus()
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

        const items = list.map((item, index) => {
            return (
                <li className="char__item" ref={this.setRefList} key={item.id}
                    tabIndex={0}
                    onClick={() => {
                        this.props.onSelectedChar(item.id)
                        this.onCharFocus(index)
                    }}
                    onKeyUp={e => {
                        if (e.key === 'Enter') {
                            this.props.onSelectedChar(item.id)
                            this.onCharFocus(index)
                        }
                    }}
                >
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


CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;