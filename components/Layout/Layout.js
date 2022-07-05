import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthenticated, loadUsers } from "../../state/actionCreators/auth";
import Footer from "./Footer";
import Header from "./Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadUsers());
    
  }, [dispatch]);
  return (
    <>
      <Header />
      <ToastContainer />
      <div className=" border-b border-b-white"></div>
      <section className="p-0 dark:bg-cloud-theme-dark font-nuno">
        {children}
      </section>
      <Footer />
    </>
  );
};
export default Layout;
