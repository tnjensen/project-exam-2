import "./leftbar.scss";
import Image1 from "../../../assets/person/1.jpeg";
import Image2 from "../../../assets/person/2.jpeg";
import Image3 from "../../../assets/person/3.jpeg";
import Image4 from "../../../assets/person/4.jpeg";
import Image5 from "../../../assets/person/5.jpeg";
import Image6 from "../../../assets/person/6.jpeg";
import { useToken } from "../../../stores/useUserStore";
import { profileUrl } from "../../../constants/api";
import useProfile from "../../../hooks/useProfile";
import Profiles from "../../profiles/Profiles";
import {
  useAvatar,
  useName
} from "../../../stores/useUserStore";
import { Link } from "react-router-dom";
function LeftBar() {
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
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link to={`/profile/${currentUser}`}>
                <img src={avatar} alt='user' />
                <span>{currentUser}</span>
            </Link>
          </div>
          <hr />
          <span className="header">Suggestions</span>
          {profiles.map((profile, index) =>
            profile.posts.length && <Profiles key={index} profile={profile} />
          )}
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Image1} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image2} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image3} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image4} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image5} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image6} alt="user" />
            <span>Jane Doe</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Image1} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image2} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image3} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image4} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image5} alt="user" />
            <span>Jane Doe</span>
          </div>
          <div className="item">
            <img src={Image6} alt="user" />
            <span>Jane Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeftBar;
