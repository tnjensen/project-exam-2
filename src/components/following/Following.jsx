import './following.scss';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Following({profile}){
    
    return(
        <div className="friend">
            <div className="friendInfo">
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
Following.propTypes = {
    profile: PropTypes.object
}
export default Following;