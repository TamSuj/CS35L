import pic from "./assets/group.png";
import SearchBar from "./searchBar.jsx";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen text-center">
            <div className="container max-w-screen-sm mx-auto mt-16">
                <img className="mx-auto" src={pic} alt="A girl chilling"/>
            </div>

            <div className="ml-6 mr-6">
                <h1 className="text-4xl pt-10 font-semibold text-gray-800">
                    No More Gatekeeping – Study Notes for Everyone.
                </h1>
                <p className="pt-5">A community-driven platform where students share, discover, and learn together.</p>
            </div>

            <button className="mt-10 bg-gray-600 text-white p-2 pl-3 pr-3 rounded-full hover:bg-gray-800">
                <Link to="/login" viewTransition>Log In</Link>  
            </button>

        </div>
    );
}

export default Home;

