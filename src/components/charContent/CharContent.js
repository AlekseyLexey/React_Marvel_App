import { Component } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

class CharContent extends Component {
	state = {
		selectedCharID: null,
	}

	onSelectedChar = (id) => {
		this.setState({selectedCharID: id})
	}

	render() {
		return (
			<div className="char__content">
				<CharList onSelectedChar={this.onSelectedChar}/>
				<CharInfo selectedCharID={this.state.selectedCharID}/>
			</div>
		)
	}
}

export default CharContent;