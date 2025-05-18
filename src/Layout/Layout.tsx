import { Outlet } from "react-router-dom";
import NavBar from "../components/modules/navbar/NavBar";
import Footer from "../components/modules/footer/Footer";

const Layout = () => {
  return (
    <section className="h-full">
      <NavBar />
      <div className="dark:bg-gray-700 overflow-x-hidden ">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default Layout;
