import { SearchOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import {
  useAvatar,
  useName,
  useUserActions,
} from "../../../stores/useUserStore";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../../sidebar/Sidebar";
import LeftBar from "../leftbar/LeftBar";

function Header() {
  const avatar = useAvatar();
  const name = useName();
  const [search, setSearch] = useState("");
  const { clearUser } = useUserActions();
  const [display, setDisplay] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notify, setNotify] = useState(false);
  const partUrl = window.location.href.split("/").pop();
  const ref1 = useRef();
  const ref2 = useRef();

  useOutsideClick(ref1, () => {
    setDisplay(false);
  });
  useOutsideClick(ref2, () => {
    setMenu(false)
  });

  const handleLogout = () => {
    clearUser();
  };

  return (
    <header className="header">
      <div className="left">
        <Link to="/">
          <div className="logo">Sentire</div>
        </Link>
        {/* <Link to={`/navigation`}><MenuIcon className="menu-icon" /></Link> */}
        <div className="sidebar-container" ref={ref2}>
          <MenuIcon className="menu-icon" onClick={() => setMenu(!menu)} />
            {menu && 
              <Sidebar />
            }
            {/* {partUrl !== `${name}` && ( */}
            <div className="search">
              <SearchOutlined />
              <input
                type="text"
                placeholder="Search.."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          {/* )} */}
          </div>
      </div>
      <div className="right">
        <NotificationsOutlinedIcon className="notifications" onClick={() => setNotify(!notify)} />
        <div className="user" ref={ref1}>
          <img
            src={avatar}
            alt="avatar"
            className="profile-icon"
            onClick={() => setDisplay(!display)}
          />
          {display && (
            <ul className="profile-menu">
              <li>
                {partUrl !== `${name}` && (
                  <Link to={`/profile/${name}`} onClick={() => setDisplay(!display)}>Profile</Link>
                )}
              </li>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
