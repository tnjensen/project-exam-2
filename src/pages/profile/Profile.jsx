import "./profile.scss";
import {
  useName,
  useToken,
} from "../../stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { MoreHorizOutlined } from "@mui/icons-material";
import { profileUrl } from "../../constants/api";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useApi from "../../hooks/useApi";
import Post from "../../components/posts/post/Post";
import { useParams } from "react-router-dom";

function Profile() {
  const ref = useRef();
  const currentUser = useName();
  const token = useToken();
  const { name } = useParams();
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(false);
  const [followed, setFollowed] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { data: userProfile } = useApi(
    profileUrl +
      `/${currentUser}` +
      `?_follower=true&_following=true`,
    token
  );
  const { data: profile } = useApi(
    profileUrl +
      `/${name}` +
      `?_follower=true&_following=true`,
    token
  );

  useOutsideClick(ref, () => {
    setDisplay(false);
  });

  useEffect(() => {
      const followingProfiles = userProfile.following;
      setFollowers(followingProfiles);
      const uniqueNames = [...new Set(followingProfiles)];
      const currentProfile = uniqueNames.filter(item => item.name === name);
      setFollowed(currentProfile);

  },[userProfile,name]);

  const { data: posts } = useApi(
    profileUrl +
      `/${name}` +
      `/posts?_author=true&_comments=true&_reactions=true`,
    token
  );

  async function handleFollow(e){
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
    }
    try {
      const response = await fetch(profileUrl + `/${name}/follow`, options);
      const json = await response.json();
      console.log(response);
      setFollowed(true);
      window.location.reload();

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUnFollow(e){
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
    }
    try {
      const response = await fetch(profileUrl + `/${name}/unfollow`, options);
      const json = await response.json();
      console.log(response);
      setFollowed(false);
      window.location.reload();

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
      body: JSON.stringify({ avatar: profile.avatar, banner: profile.banner }),
    };

    try {
      const response = await fetch(profileUrl + `/${name}` + `/media`, options);
      const json = await response.json();
      console.log(response);

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile">
      <div className="images">
        <img
          className="cover"
          src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        {profile.avatar ? (
            <img className="profile-image" src={profile.avatar} />
          ) : (
            <img className="profile-image" src="/assets/person/noAvatar.png" />
          )}
        
      </div>
      <div className="profile-content">
        <div className="left">
            <FacebookOutlinedIcon className="social-icon" />
            <PinterestIcon className="social-icon" />
            <LinkedInIcon className="social-icon" />
            <InstagramIcon className="social-icon" />  
        </div>
        <div className="center">
          <h3>Name: {profile.name}</h3>
          <p>Email: {profile.email}</p>
          <p className="web">Website: {profile.banner}</p>
          {name !== currentUser && (
            <div className="bottom">
              {followed.length ? <button className="follow-button" onClick={handleUnFollow}>Unfollow</button> 
              : <button className="follow-button" onClick={handleFollow}>Follow</button>
              }
            </div>
          )}
        </div>
        <div className="right">
          <div className="more" ref={ref}>
          {name === currentUser &&
            <MoreHorizOutlined onClick={() => setDisplay(!display)} />
          }
          </div>
          {display && name === currentUser && (
            <div className="profile-details">
              <h3>Edit profile</h3>
              <p className="avatar">
                Avatar: <img src={profile.avatar} />
              </p>
              <input type="text" placeholder="New avatar url.." />
              <p>Website: {profile.banner}</p>
              <input type="text" placeholder="New site url.." />
              <button className="edit-details-button" onClick={handleUpdate}>
                Update details
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-posts">
        {posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
}
export default Profile;
