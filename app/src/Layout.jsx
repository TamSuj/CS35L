import { Outlet, Link } from "react-router-dom";
import SearchBar from "./searchBar.jsx";

const Layout = () => {
    return (
        <>
            <nav className="bg-white p-4 flex justify-between">
                {/*Left Logo*/}
                <h1 className="text-xl font-bold text-gray-800 p-2"><Link to="/">StudyGram</Link></h1>

                {/*Right menus*/}
                <div className="p-2">
                    <a className="p-4"><Link to="/">Home</Link>
                    </a>
                    <a className="p-4" href=""><Link to="/profile">Profile</Link>
                    </a>
                </div>
            </nav>
            <Outlet/>
        </>
    )
};

export default Layout;