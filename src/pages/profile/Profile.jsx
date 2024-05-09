import './profile.scss';
import Header from "../../components/header/Header";
import LeftBar from "../../components/leftbar/LeftBar";
import RightBar from "../../components/rightbar/Rightbar";
import { useAvatar, useBanner, useName, useToken } from "../../stores/useUserStore";
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../hooks/useAuth';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { MoreHorizOutlined } from '@mui/icons-material';
import { profileUrl } from '../../constants/api';
import useApi from '../../hooks/useApi';
import Post from '../../components/post/Post';
import { useParams } from 'react-router-dom';

function Profile(){
    const token = useToken();
    const {name} = useParams();
    const [display,setDisplay] = useState(false)
    const [error,setError] = useState(false)
    const avatar = useAvatar();
    const banner = useBanner();
    const {user} = useContext(AuthContext);
    const {data:posts} = useApi(profileUrl + `/${name}` + `/posts?_author=true&_comments=true&_reactions=true`,token);
    console.log(avatar);
    console.log(banner);
    console.log(posts);

    async function handleUpdate(e) {
        e.preventDefault();
		const options = {
			headers: { 
                "Content-Type": "application/json", 
                Authorization: "Bearer " + token 
            },
			method: "PUT",
			body: JSON.stringify({avatar:avatar, banner:banner}),
		};

		try {
			const response = await fetch(profileUrl + `/${name}` + `/media`, options);
			const json = await response.json();
            console.log(response);

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
                /* return setError("Please fill in all the fields.."); */
			}
           /*  window.location.reload(); */

		} catch (error) {
			console.log(error);
		}
	}

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
                <div className='left'>
                    <h3>Name: {user.state.user.name}</h3>
                    <p>Email: {user.state.user.email}</p>
                    
                </div>
                <div className='center'>
                    <div className='top'>
                    <FacebookOutlinedIcon className='social-icon' />
                    <PinterestIcon className='social-icon' />
                    <LinkedInIcon className='social-icon' />
                    <InstagramIcon className='social-icon' />
                    </div>  
                    {!name && <div className='bottom'>
                        <button className='follow-button'>Follow</button>
                    </div>}
                </div>
                <div className='right'>
                    <div className='more'>
                        <MoreHorizOutlined onClick={() => setDisplay(!display)} />
                    </div>
                    {display && name &&
                    <div className='profile-details'><h3>Edit profile</h3>
                    <p className='avatar'>Avatar: <img src={avatar} /></p>
                    <input type='text' placeholder='New avatar url..' />
                    <p>Website: {user.state.user.banner}</p>
                    <input type='text' placeholder='New site url..' />
                    <button className='edit-details-button' onClick={handleUpdate}>Update details</button>
                    </div>}
                </div>
             </div>
             <div className='profile-posts'>
                {posts.map((post) => (
                    post.media && <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}
export default Profile;