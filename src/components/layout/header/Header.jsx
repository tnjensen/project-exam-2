import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import {
  useAvatar,
  useName,
  useUserActions,
} from "../../../stores/useUserStore";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../../sidebar/Sidebar";

function Header() {
  const avatar = useAvatar();
  const name = useName();
  const { clearUser } = useUserActions();
  const [display, setDisplay] = useState(false);
  const [menu, setMenu] = useState(false);
  const partUrl = window.location.href.split("/").pop();
  const menuRef = useRef();
  const userRef = useRef();

  console.log(name);

  useOutsideClick(menuRef, () => {
    setMenu(false);
  });
  useOutsideClick(userRef, () => {
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
        <div className="sidebar-container" ref={menuRef}>
          <MenuIcon className="menu-icon" onClick={() => setMenu(!menu)} />
            {menu && 
              <Sidebar />
            }
        </div>
      </div>
      <div className="right">
        <div className="user" ref={userRef}>
          {avatar ? (
            <img src={avatar}
            alt="avatar"
            className="profile-icon"
            onClick={() => setDisplay(!display)}
          />
          ) : (
          <FaceOutlinedIcon
            className="profile-icon"
            onClick={() => setDisplay(!display)}
          />
          )}
          
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
