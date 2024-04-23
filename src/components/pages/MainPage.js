import RandomChar from "../randomChar/RandomChar";
import CharContent from "../charContent/CharContent";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {

	return (
		<>
			<RandomChar />
			<CharContent />
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	)
}

export default MainPage;