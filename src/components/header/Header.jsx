import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link} from "react-router-dom";
import './header.scss';
import { useAvatar, useName, useUserActions} from "../../stores/useUserStore";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

function Header(){
    const avatar = useAvatar();
    const name = useName();
    const [search,setSearch] = useState("");
    const {clearUser} = useUserActions();
    const [display,setDisplay] = useState('none');
    const partUrl = window.location.href.split("/").pop();

    const handleLogout = () =>{
        clearUser();  
    }

    const handleClick = () => {
        if(display == 'none'){
            setDisplay('block')
        }else{
            setDisplay('none')
        }
    }
    return(
        <header className="header">
            <div className="left">
                <Link to="/">
                <div className="logo">Sentire</div>
                </Link>
                {partUrl !== `${name}` &&
                        <div className="search">
                        <SearchOutlined />
                        <input type="text" placeholder="Search.." onChange={e => setSearch(e.target.value)} />
                    </div>
                }
            </div>
            <div className="right">
                <NotificationsOutlinedIcon className="notifications" />
                <div className="user">
                    <img src={avatar} alt='avatar' className="profile-icon"  onClick={handleClick} />
                    <ul style={{display:display}} className="profile-menu">
                        <li>
                        {partUrl !== `${name}` &&
                            <Link to={`/profile/${name}`}>
                                Profile
                            </Link>
                        }
                        </li>
                        <li>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>         
                </div>   
            </div>
        </header>
    )
}
export default Header;