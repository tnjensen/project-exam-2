import './latest.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useToken } from '../../stores/useUserStore';
import useApi from "../../hooks/useApi";
import { profileUrl } from '../../constants/api';
import { useParams } from 'react-router-dom';

function Latest({profile}){
    const token = useToken();
    const { name } = useParams();
    const { data: posts } = useApi(
        profileUrl +
          `/${name}` +
          `/posts?_author=true&_comments=true&_reactions=true`,
        token
      );

    console.log(posts);
    return(
        <div className="latest">
            <div className="friendInfo">
            {profile.avatar ? 
                    <img src={profile.avatar} alt="" />
                : 
                    <img src="/assets/person/noAvatar.png" />
                }
                {/* <div className="details">
                    {profile && <span className="name">{profile.name}</span>}
                </div> */}
                <p><span>{profile.name}</span> updated a post </p>
            </div>
            <span className="date">
            {/* {moment(posts.updated).fromNow()} */}
            {posts.updated}
            </span>
        </div>
    )
}
Latest.propTypes = {
    profile: PropTypes.object
}
export default Latest;