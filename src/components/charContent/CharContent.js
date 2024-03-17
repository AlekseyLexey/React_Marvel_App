import { useState } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

const CharContent = () => {

	const [selectedCharID, setSelectedCharID] = useState(null);

	const onSelectedChar = (id) => {
		setSelectedCharID(id)
	}

	return (
		<div className="char__content">
			<CharList onSelectedChar={onSelectedChar}/>
			<CharInfo selectedCharID={selectedCharID}/>
		</div>
	)
}

export default CharContent;