import { Outlet, Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import arrowLeft from "./assets/left-arrow.svg";

const Layout = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            {/* Check if we're on /newpost to use a different navbar */}
            {location.pathname === "/newpost" ? (
                <></>
            ) : (
                <nav className="bg-white p-4 flex justify-between items-center">
                    {/* Left Logo */}
                    <h1 className="text-xl font-bold text-gray-800 p-2">
                        <Link to="/" viewTransition>StudyGram</Link>
                    </h1>

                    {/* Right Menu + Search Bar */}
                    <div className="flex items-center gap-4 flex-grow justify-end">
                        <div className="w-1/3">
                            <SearchBar />
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800">
                                <Link to="/newpost" viewTransition>+ Create</Link>
                            </button>
                            <Link className="p-2" to="/" viewTransition>Home</Link>
                            {user ? (
                                <Link className="p-2" to={`/profile/${user.id}`} viewTransition>Profile</Link>
                            ) : (
                                <Link className="p-2" to="/login" viewTransition>Login</Link>
                            )}
                        </div>
                    </div>
                </nav>
            )}
            <Outlet />
        </>
    );
};

export default Layout;
