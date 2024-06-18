import './sidebar.scss';
import { useToken } from "../../stores/useUserStore";
import { profileUrl } from "../../constants/api";
import useProfile from "../../hooks/useProfile";
import Profiles from "../profiles/Profiles";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import {
  useAvatar,
  useName
} from "../../stores/useUserStore";
import { Link } from "react-router-dom";
import { useRef, useState } from 'react';

function Sidebar() {
  const ref = useRef();
  const [menu, setMenu] = useState(false);

  const currentUser = useName();
  const avatar = useAvatar();
  const token = useToken();
  const {
      data: profiles,
      isError,
      isLoading,
    } = useProfile(profileUrl + `?offset=300_followers=true&_following=true&_posts=true`, token);
  console.log(profiles);

  /* if (isLoading) {
    return <div>Loading...</div>;
  } */
  if (isError) {
    return <div>Error loading profiles.</div>;
  }
  return (
    <div className="sidebar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link to={`/profile/${currentUser}`} onClick={window.location.reload}>
                <img src={avatar} alt='user' />
                <span>{currentUser}</span>
            </Link>
          </div>
          <hr />
          <span className="header">Suggestions for you</span>
          {profiles.map((profile, index) =>
            profile.posts.length > 0 && <Profiles key={index} profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;