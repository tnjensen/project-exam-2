import { Link } from "react-router-dom";
import "./profile.scss";

function Profile({profile}) {

  return (
    <div className="profile">
        <div className="userInfo">
        <Link to={`/profile/${profile.name}`}>
          {profile.avatar ? (
            <img src={profile.avatar} alt="" />
          ) : (
            <img src="/assets/person/noAvatar.png" />
          )}
          <div className="details">
              {profile && <span className="name">{profile.name}</span>}
            </div>
            </Link>
        </div>
    </div>
  );
}
export default Profile;
