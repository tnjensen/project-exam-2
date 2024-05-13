import { useEffect, useState } from 'react';
import { profileUrl } from "../../../constants/api";
import useProfile from "../../../hooks/useProfile";
import { useName, useToken } from '../../../stores/useUserStore';
import Following from '../../following/Following';
import './rightbar.scss';
import Followers from '../../followers/Followers';

function RightBar(){
    const currentUser = useName();
    const token = useToken();
    const {
        data: profile,
        isError,
        isLoading,
        } = useProfile(profileUrl + `/${currentUser}?_followers=true&_following=true&_posts=true`, token);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const followerProfiles = profile.followers;
        const filteredFollowerProfiles = [...new Set(followerProfiles)];
        setFollowers(filteredFollowerProfiles);
        
        const followingProfiles = profile.following;
        const filteredFollowingProfiles = [...new Set(followingProfiles)];
        setFollowing(filteredFollowingProfiles);

    },[profile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profiles.</div>;
  }
    return(
        <div className='rightbar'>
            <div className="container">
                <div className="item">
                    <span>Friends</span>
                    {following.map((profile, index) =>(
                        <Following key={index} profile={profile} />
                    ))}
                </div>
                
                <div className="item">
                    <span>Followers</span>
                    {followers.map((profile, index) =>(
                        <Followers key={index} profile={profile} />
                    ))}
                </div>
                <div className="item">
                    <span>Latest activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='user' />
                            <p><span>Jane Doe</span> changed their cover picture</p>
                        </div>
                        <span className="date">
                            1 min ago
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RightBar;