import { useEffect, useState } from 'react';
import { profileUrl } from "../../../constants/api";
import useProfile from "../../../hooks/useProfile";
import { useName, useToken } from '../../../stores/useUserStore';
import Following from '../../following/Following';
import './rightbar.scss';
import Followers from '../../followers/Followers';
import Latest from '../../latest/Latest';
import { useParams } from 'react-router-dom';

function RightBar(){
    const currentUser = useName();
    const user = useParams();
    const partUrl = window.location.href.split("/").pop();
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
                    <span className='header'>Friends</span>
                    {following.map((profile, index) =>(
                        <Following key={index} profile={profile} />
                    ))}
                </div>
                
                <div className="item">
                    <span className='header'>Followers</span>
                    {followers.map((profile, index) =>(
                        <Followers key={index} profile={profile} />
                    ))}
                </div>
                <div className="item">
                    <span className='header'>Activities</span>
                    {partUrl === user.name ? <Latest key={user} profile={user} />
                    : "Please choose a profile"}
                </div>
            </div>
        </div>
    )
}
export default RightBar;