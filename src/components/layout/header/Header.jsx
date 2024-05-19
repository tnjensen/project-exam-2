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

function Header() {
  const avatar = useAvatar();
  const name = useName();
  const [search, setSearch] = useState("");
  const { clearUser } = useUserActions();
  const [display, setDisplay] = useState(false);
  const [menu, setMenu] = useState(false);
  const partUrl = window.location.href.split("/").pop();
  const ref = useRef();

  useOutsideClick(ref, () => {
    setDisplay(false);
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
        <Link to={`/navigation`}><MenuIcon className="menu-icon" /></Link>
          {partUrl !== `${name}` && (
          <div className="search">
            <SearchOutlined />
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="right">
        <NotificationsOutlinedIcon className="notifications" />
        <div className="user" ref={ref}>
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
