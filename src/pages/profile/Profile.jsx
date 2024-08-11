import "./profile.scss";
import { useName, useToken } from "../../stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { MoreHorizOutlined } from "@mui/icons-material";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useApi from "../../hooks/useApi";
import Post from "../../components/posts/post/Post";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Profile() {
  const profileUrl = import.meta.env.VITE_PROFILE_URL;
  const ref = useRef();
  const currentUser = useName();
  const token = useToken();
  const { name } = useParams();
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(false);
  const [followed, setFollowed] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");
  const { data: userProfile } = useApi(
    profileUrl + `/${currentUser}` + `?_follower=true&_following=true`,
    token
  );
  const { data: profile } = useApi(
    profileUrl + `/${name}` + `?_follower=true&_following=true`,
    token
  );
  console.log(userProfile);

  useOutsideClick(ref, () => {
    setDisplay(false);
  });

  useEffect(() => {
    const followingProfiles = userProfile.following;
    setFollowers(followingProfiles);
    const uniqueNames = [...new Set(followingProfiles)];
    const currentProfile = uniqueNames.filter((item) => item.name === name);
    setFollowed(currentProfile);
  }, [userProfile, name]);

  const { data: posts } = useApi(
    profileUrl +
      `/${name}` +
      `/posts?_author=true&_comments=true&_reactions=true`,
    token
  );

  async function handleFollow(e) {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
    };
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
  async function handleUnFollow(e) {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "PUT",
    };
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
      body: JSON.stringify({ avatar, banner }),
    };

    try {
      const response = await fetch(
        profileUrl + `/${currentUser}` + `/media`,
        options
      );
      const json = await response.json();
      window.location.reload();
      console.log(json);

      if (!response.ok) {
        return setError(json.errors?.[0]?.message ?? "There was an error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profile">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="images">
        <img
          className="cover"
          src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600"
        />
        {userProfile.avatar ? (
          <img className="profile-image" src={userProfile.avatar} />
        ) : profile.avatar ? (
          <img className="profile-image" src={profile.avatar} />
        ) : (
          <img className="profile-image" src="/assets/person/noAvatar.png" />
        )}
      </div>
      <div className="profile-content">
        <div className="left">
          <FacebookOutlinedIcon className="social-icon" tabIndex={0} />
          <PinterestIcon className="social-icon" tabIndex={0} />
          <LinkedInIcon className="social-icon" tabIndex={0} />
          <InstagramIcon className="social-icon" tabIndex={0} />
        </div>
        <div className="center">
          <h3>Name: {profile.name}</h3>
          <p>
            Email: <a href="mailto:{profile.email}">{profile.email}</a>
          </p>
          <p className="web">
            Website:{" "}
            <a href={profile.banner} tabIndex={0}>
              {profile.banner}
            </a>
          </p>
          {name !== currentUser && (
            <div className="bottom">
              {followed.length ? (
                <button className="follow-button" onClick={handleUnFollow}>
                  Unfollow
                </button>
              ) : (
                <button className="follow-button" onClick={handleFollow}>
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
        <div className="right">
          <div className="more" ref={ref}>
            {name === currentUser && (
              <MoreHorizOutlined
                onClick={() => setDisplay(!display)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    setDisplay(!display);
                  }
                }}
              />
            )}
            {display && name === currentUser && (
              <div className="profile-details">
                <h3>Edit profile</h3>
                <p className="avatar">Avatar: {profile.avatar}</p>
                <form onSubmit={handleUpdate}>
                  <input
                    type="text"
                    placeholder="New avatar url.."
                    onChange={(e) => setAvatar(e.target.value)}
                    required
                  />
                  <p>Website: {profile.banner}</p>
                  <input
                    type="text"
                    placeholder="New site url.."
                    onChange={(e) => setBanner(e.target.value)}
                    required
                  />
                  <input
                    type="submit"
                    className="edit-details-button"
                    value="Update details"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="profile-posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
export default Profile;
