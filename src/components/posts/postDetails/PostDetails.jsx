import { Link } from "react-router-dom";
import "./postDetails.scss";
import PropTypes from "prop-types";

function PostDetails({ postId }) {
  return (
    <div className="more">
      <Link to={`/detail/${postId}`}>View details</Link>
    </div>
  );
}
PostDetails.propTypes = {
  postId: PropTypes.number,
};
export default PostDetails;
