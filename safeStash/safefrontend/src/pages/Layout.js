import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <div className="container mt-6">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
