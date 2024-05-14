import './followers.scss';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Followers({profile}){

    return(
        <div className="follower">
            <div className="followerInfo">
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
    )

}
Followers.propTypes = {
    profile: PropTypes.object
}
export default Followers;