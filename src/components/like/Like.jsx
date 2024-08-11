import "./like.scss";
import PropTypes from "prop-types";

function Like({ like }) {
  const symbol = like.symbol;

  return (
    <div className="likes">
      <div className="emoji">{symbol}</div>
    </div>
  );
}
Like.propTypes = {
  like: PropTypes.object,
};
export default Like;
