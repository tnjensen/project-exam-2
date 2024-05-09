import { apiUrl } from "../../constants/api.js";
import "../posts/posts.scss";
import useProfiles from "../../hooks/useApi.js";
import Post from "../posts/post/Post.jsx";
import { useToken } from "../../stores/useUserStore.jsx";
import Share from "../share/Share";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useState } from "react";
import Profile from "../../pages/profile/Profile.jsx";

function Profiles() {
  const [shareOpen, setShareOpen] = useState(false);
  const token = useToken();
  const {
    data: profiles,
    isLoading,
    isError,
  } = useProfiles(
    apiUrl + `?_author=true&_comments=true&_reactions=true`,
    token
  );
  console.log(profiles);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading posts.</div>;
  }
  return (
    <div className="posts">
      {shareOpen ? (
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
      )}
      {profiles.map((profile) => (
        <Profile key={profile.name} profile={profile} />
      ))}
    </div>
  );
}
export default Profiles;
