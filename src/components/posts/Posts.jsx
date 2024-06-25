import { apiUrl } from "../../constants/api.js";
import "./posts.scss";
import useApi from "../../hooks/useApi.js";
import Post from "./post/Post.jsx";
import { useToken } from "../../stores/useUserStore.jsx";
import Share from "../share/Share";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";

function Posts() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const token = useToken();
  const {
    data: posts,
    isLoading,
    isError,
  } = useApi(apiUrl + `?_author=true&_comments=true&_reactions=true`, token);
  console.log(posts);

  useEffect(() => {
    setFilteredResults(filteredResults);
  }, [filteredResults])

  if (isLoading) {
    return <div></div>;
  }
  if (isError) {
    return <div>Error loading posts.</div>;
  }

  
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
        const filteredData = posts.filter((item) => {
            return Object.values(item.title).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(posts)
    }
  }
  return (
    <div className="posts">
      {/* {shareOpen ? (
        <>
          <RemoveOutlinedIcon
            className="add-post"
            onClick={() => setShareOpen(!shareOpen)}
          />
          <Share />
        </>
      ) : (
        <AddOutlinedIcon
          className="add-post"
          onClick={() => setShareOpen(!shareOpen)}
        />
      )} */}
      <Share />
      <div className="search">
              <SearchOutlined />
              <input
                type="text"
                placeholder="Enter post title"
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
      {searchInput.length > 0 ? (
                filteredResults.map((post) => (
                  post.media && <Post key={post.id} post={post} />
                ))
            ) : (
            posts.map((post) => (
            post.media && <Post key={post.id} post={post} />
            ))
      )}
    </div>
  );
}
export default Posts;
