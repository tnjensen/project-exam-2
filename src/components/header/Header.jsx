import { PersonOutlineRounded, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.scss';
import { useUserActions} from "../../stores/useUserStore";

function Header(){
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
        <div className="header">
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
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                    <Link to="#" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Header;