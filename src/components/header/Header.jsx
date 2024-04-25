import { PersonOutlineRounded, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link} from "react-router-dom";
import './header.scss';
import { useAvatar, useName, useUserActions} from "../../stores/useUserStore";

function Header(){
    const avatar = useAvatar();
    const name = useName();
    const [search,setSearch] = useState("");
    const {clearUser} = useUserActions();
    const [display,setDisplay] = useState('none');

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
                <div className="search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search.." onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="right">
                <PersonOutlineRounded className="profile-icon" onClick={handleClick} />
                <ul style={{display:display}} className="profile-menu">
                    <li>
                        <Link to="/profile/:name">Profile</Link>
                    </li>
                    <li>
                    <Link to="#" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
                <div className="user">
                        <img src={avatar} alt='' />
                        <span>{name}</span>
                    </div>
            </div>
        </header>
    )
}
export default Header;