import { Link } from "react-router-dom";
import "./profiles.scss";
import PropTypes from 'prop-types';

function Profiles({profile}) {
  return (
    <div className="profile">
        <div className="userInfo">
        <Link to={`/profile/${profile.name}`}>
          {profile.avatar ? 
            <img src={profile.avatar} alt="" />
           : 
            <img src="/assets/person/noAvatar.png" />
          }
          <div className="details">
              {profile && <span className="name">{profile.name}</span>}
            </div>
            </Link>
        </div>
    </div>
  );
}
Profiles.propTypes = {
  profile: PropTypes.object
}
export default Profiles;
