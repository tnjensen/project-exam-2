import PropTypes from 'prop-types';

function ServerWarning({ children }) {
	return (
		<p className="text-white bg-orange-600 border border-orange-700 text-sm mt-2 p-4 flex items-center space-x-2 max-w-md mx-auto">
			{children}
		</p>
	);
}
ServerWarning.propTypes = {
    children: PropTypes.props
}
export default ServerWarning;
