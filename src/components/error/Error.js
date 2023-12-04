import img from './error.gif';
import './error.scss';

const ErrorImg = () => {
	return (
		<div className="error_wrapper">
			<img src={img} alt="Error"/>
		</div>
		
	)
}

export default ErrorImg;