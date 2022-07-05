import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import { loadUsers,checkAuthenticated } from "../../state/actionCreators/auth";
import { logout } from "../../state/actionCreators/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const Header = () => {
  const [darkMode, setDarkMode] = useState(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  const [openProfileFilter, setOpenProfileFilter] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(checkAuthenticated()) 
  // }, [dispatch]);
  useEffect(() => {
    // console.log('theme status: ',localStorage.cloudTheme)
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);
  useEffect(() => {
    const docRootElement = window.document.documentElement;
    if (darkMode) {
      docRootElement.classList.add("dark");
      localStorage.setItem("cloudTheme", "true");
    } else {
      docRootElement.classList.remove("dark");
      localStorage.setItem("cloudTheme", "false");
    }
  }, [darkMode]);

  const onClick = () => {
    setDarkMode(!darkMode);
  };

  const user = null;
  const isAuthenticated = false;
  // const user = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <header className="mb-0 py-0 px-3 z-1020 shadow-md dark:bg-cloud-theme-dark fixed bg-white w-full">
        <div
          className={
            menuOpen
              ? "bg-transparent left-0 md:hidden h-screen w-full fixed z-1020 top-0 transition-all duration-300"
              : "-left-full transition-all absolute h-screen w-full duration-300"
          }
        >
          <ul className="bg-gray-200 relative opacity-100 h-full w-full p-5 ease-in duration-500 ">
            <div className="w-full mb-2 flex justify-between items-center content-center">
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 bg-blue-400 shadow-md rounded-sm"
              >
                <GrClose className="text-lg text-white" />
              </div>
              <h2
                translate="no"
                className="font-bold text-xl text-cloud-theme-blue text-center"
              >
                Estate Cloud
              </h2>
            </div>
            <li className="w-full bg-blue-100 rounded-md mb-2">
              <Link href="/">
                <a
                  className="px-3 py-3 w-full block dark:hover:bg-cloud-theme-blue transition-all duration-300 hover:shadow-md 
               font-semibold dark:hover:text-white hover:bg-cloud-theme-blue hover:text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="w-full bg-blue-100 rounded-md mb-2">
              <Link href="/listings">
                <a
                  className="px-3 py-3 w-full block dark:hover:bg-cloud-theme-blue transition-all duration-300 hover:shadow-md 
                font-semibold dark:hover:text-white hover:bg-cloud-theme-blue hover:text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  Properties
                </a>
              </Link>
            </li>
            <li className="w-full bg-blue-100 rounded-md mb-2">
              <Link href="/news">
                <a
                  className="px-3 py-3 w-full block dark:hover:bg-cloud-theme-blue transition-all duration-300 hover:shadow-md 
                font-semibold dark:hover:text-white hover:bg-cloud-theme-blue hover:text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  News & Insights
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={
            menu2Open
              ? "bg-transparent right-0 md:hidden h-screen w-full fixed z-1020 top-0 transition-all duration-300"
              : "-right-full transition-all absolute h-screen w-full duration-300"
          }
        >
          <ul className="bg-gray-200 relative opacity-100 h-full w-full p-4 ease-in duration-500 ">
            <div className="w-full mb-2 flex justify-between items-center content-center">
              <h2
                translate="no"
                className="font-bold text-xl text-cloud-theme-blue text-center"
              >
                Estate Cloud
              </h2>
              <div
                onClick={() => setMenu2Open(!menu2Open)}
                className="p-1.5 bg-blue-400 shadow-md rounded-sm"
              >
                <GrClose className="text-lg text-white" />
              </div>
            </div>

            
          </ul>
        </div>
        <nav className="flex py-5 justify-between items-center content-center dark:text-white">
          <div
            className="md:hidden p-2 rounded-md bg-cloud-theme-blue"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <GiHamburgerMenu className="text-xl text-white" />
          </div>
          <div>
            <Link href="/">
              <a className="md:text-3xl text-2xl text-cloud-theme-blue font-extrabold dark:text-red-500">
                Estate Cloud
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex justify-around items-center content-center">
              <li className="font-medium">
                <Link href="/">
                  <a className="px-2.5 py-2 w-full block transition-all duration-300 hover:shadow-md hover:bg-gray-700 hover:text-white">
                    Home
                  </a>
                </Link>
              </li>
              <li className="font-medium">
                <Link href="/listings">
                  <a className="px-2.5 py-2 w-full block transition-all duration-300 hover:shadow-md hover:bg-gray-700 hover:text-white">
                    Properties
                  </a>
                </Link>
              </li>
              <li className="font-medium">
                <Link href="/news">
                  <a className="px-2.5 py-2 w-full block transition-all duration-300 hover:shadow-md hover:bg-gray-700 hover:text-white">
                    News & Insights
                  </a>
                </Link>
              </li>
            
            </ul>
          </div>
          <div
            className={
              openProfileFilter
                ? `fixed hidden md:block z-80 right-0 backdrop-filter backdrop-blur-lg bg-opacity-10 w-full h-screen top-0 overflow-hidden transition-all bg-blue-400 duration-500 ease`
                : `fixed -top-full z-80 w-full right-0 transition-all bg-blue-400 duration-500 ease`
            }
          >
            <ul className="w-64 h-full bg-gray-200 right-0 float-right">
              <div className="bg-blue-300">
                <button
                  type="button"
                  className="w-full p-3 flex justify-between items-center"
                  onClick={() => setOpenProfileFilter(!openProfileFilter)}
                >
                  <GrClose className="text-lg " />
                  <h5 className="font-semibold text-lg">Close</h5>
                </button>
              </div>

              {/* <li>
                <Link
                  to="#"
                  onClick={() => onClick()}
                  className="px-3 py-2 dark:hover:bg-white dark:hover:text-black hover:bg-gray-700 hover:text-white"
                >
                  {darkMode ? "Light" : "Dark"}
                </Link>
              </li> */}
            </ul>
          </div>
          <div
            className="md:hidden p-2 rounded-md bg-cloud-theme-blue"
            onClick={() => setMenu2Open(!menu2Open)}
          >
            <FaUser className="text-xl text-white" />
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
