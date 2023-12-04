import { Component } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

class CharContent extends Component {
	state = {
		selectedChar: null,
	}

	onSelectedChar = (id) => [
		this.setState({selectedChar: id})
	]

	render() {
		return (
			<div className="char__content">
				<CharList onSelectedChar={this.onSelectedChar}/>
				<CharInfo selectedChar={this.state.selectedChar}/>
			</div>
		)
	}
}

export default CharContent;