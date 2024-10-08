import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import LeftBar from "./leftbar/LeftBar";
import RightBar from "./rightbar/Rightbar";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
