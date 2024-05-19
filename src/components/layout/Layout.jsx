import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import LeftBar from "./leftbar/LeftBar";
import RightBar from "./rightbar/Rightbar";

const Layout = () => {
  const partUrl = window.location.href.split("/").pop();
  
  return (
    <div className="wrapper">
      <Header />
      <div style={{ display: "flex" }}>
          {/* {partUrl !== 'navigation' &&  */}
            <LeftBar />
         {/*  } */}
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};
export default Layout;
