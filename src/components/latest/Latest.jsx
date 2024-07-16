import './latest.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useToken } from '../../stores/useUserStore';
import useApi from "../../hooks/useApi";
import { useParams } from 'react-router-dom';

function Latest({profile}){
    const profileUrl = import.meta.env.VITE_PROFILE_URL;
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
                <p>{profile.name}&apos;s latest update was  </p>
            </div>
            <span className="date">
            { posts[0] && moment(posts[0].updated).fromNow()}
            {posts.updated}
            </span>
        </div>
    )
}
Latest.propTypes = {
    profile: PropTypes.object
}
export default Latest;