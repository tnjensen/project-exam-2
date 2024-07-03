import { useState } from "react";
import "./postDetail.scss";
import useApi from "../../../hooks/useApi.js";
import { apiUrl } from "../../../constants/api.js";
import { useName, useToken } from "../../../stores/useUserStore.jsx";
import ServerWarning from "../../shared/ServerWarning.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function PostDetail() {
  const { id } = useParams();
  const token = useToken();
  const { data: post } = useApi(apiUrl + `/${id}?_author=true`, token);
  const currentUser = useName();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(false);
  const [file, setFile] = useState(false);
  const navigate = useNavigate();
  const owner = post.author;

  console.log(owner);
  const handleError = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  async function handleUpdate(e) {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: JSON.stringify({ title, body, media: file || "" }),
    };

    try {
      const response = await fetch(apiUrl + `/${id}`, options);
      const json = await response.json();
      console.log(response);

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    };

    try {
      const response = await fetch(apiUrl + `/${id}`, options);
      const json = await response.json();

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit">
      {owner && 
      <Link to={`/profile/${owner.name}`} className="back-link">
        <ArrowBackOutlinedIcon />
        Back to {owner.name}&apos;s profile
      </Link>}
      { post && owner && currentUser === owner.name ? 
        <h3>Edit Post</h3> :
        <h3>Post Details</h3>
      }
      {error && <ServerWarning>{error}</ServerWarning>}
      <form className="edit-form">
      {post && owner && currentUser === owner.name ?
      <>
        <label htmlFor="title">Title:</label>
         <input
          id="title"
          type="text"
          placeholder={post.title}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
         />
        </>
        : 
        <span>{post.title}</span>}
        {post && owner && currentUser === owner.name ?
        <>
        <label htmlFor="content">Content:</label>
         <input
          id="content"
          type="text"
          placeholder={post.body}
          onChange={(e) => setBody(e.target.value)}
          value={body}
        /> 
        </>
        : 
        <span>{post.body}</span>}
        {post && owner && currentUser === owner.name &&
          <label htmlFor="content">Image:</label>
        }
        <img src={post.media} alt="post" />
        {post && owner && currentUser === owner.name && (
          <input
            placeholder="New image url..."
            onChange={(e) => setFile(e.target.value)}
          />
        )}
        {error ? (
          <button
            style={{
              backgroundColor: "#1546E6",
              color: "white",
              padding: "10px",
            }}
            onClick={handleError}
          >
            OK
          </button>
        ) : (
          post &&
          owner &&
          currentUser === owner.name && (
            <>
              <button className="edit-button" onClick={handleUpdate}>
                Update
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </>
          )
        )}
      </form>
    </div>
  );
}
export default PostDetail;
