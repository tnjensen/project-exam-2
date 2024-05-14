import './followers.scss';
import { Link } from "react-router-dom";

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
export default Followers;