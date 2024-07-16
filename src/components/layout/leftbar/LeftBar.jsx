import "./leftbar.scss";
import { useToken } from "../../../stores/useUserStore";
import useProfile from "../../../hooks/useProfile";
import Profiles from "../../profiles/Profiles";
import {
  useAvatar,
  useName
} from "../../../stores/useUserStore";
import { Link } from "react-router-dom";

function LeftBar() {
  const profileUrl = import.meta.env.VITE_PROFILE_URL;
  const currentUser = useName();
  const avatar = useAvatar();
  const token = useToken();
  const {
      data: profiles,
      isError,
      isLoading,
    } = useProfile(profileUrl + `?offset=300_followers=true&_following=true&_posts=true`, token);
  console.log(profiles);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profiles.</div>;
  }
  return (
    <div className="leftbar">
      <div className="wrapper">
        <div className="menu">
          <div className="item">
            <Link to={`/profile/${currentUser}`}>
            {avatar ? (
              <><img src={avatar} alt='user' />
              <span>{currentUser}</span>
              </>
            ) : (
              <><img src='/assets/person/noAvatar.png' alt='user' />
              <span>{currentUser}</span>
              </>
            )}
          </Link>
          </div>
          <hr />
          <h3 className="header">Suggestions for you</h3>
          {profiles.map((profile, index) =>
            profile.posts.length > 0 && <Profiles key={index} profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
}
export default LeftBar;
