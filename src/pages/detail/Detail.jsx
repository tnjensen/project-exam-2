import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import "./detail.scss";
import PropTypes from "prop-types";

function Detail({ post }) {
  return (
    <div className="detail">
      <Header />
      <Post postId={post.id} />
    </div>
  );
}
Detail.propTypes = {
  post: PropTypes.object,
};
export default Detail;
