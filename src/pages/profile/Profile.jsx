import './profile.scss';
import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/Rightbar";
import { useAvatar } from "../../stores/useUserStore";

function Profile(){
    const avatar = useAvatar();
    return(
       
        <div className="profile">
             <Header />
             {/* <LeftBar /> */}
             {/* <RightBar /> */}
            <div className="images">
                <img className="cover" src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600" />
                <img className="profile-image" src={avatar} />
            </div>
             <div className="profile-content">

             </div>
        </div>
    )
}
export default Profile;