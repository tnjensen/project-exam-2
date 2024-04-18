import { PersonOutlineRounded, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './header.scss';
import { useUserActions} from "../../stores/useUserStore";

function Header(){
    const [search,setSearch] = useState("");
    const {clearUser} = useUserActions();

    const handleLogout = () =>{
        clearUser();  
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
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                <PersonOutlineRounded className="profile-icon" />
            </div>
        </div>
    )
}
export default Header;