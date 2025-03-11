import { Link } from "react-router-dom";

function LogInRequired() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="px-6">
                <h1 className="text-4xl font-semibold text-gray-800">
                    Log in to access this page
                </h1>
                <p className="pt-5 text-lg text-gray-600">
                    Explore 1,000+ study materials at your fingertips.
                </p>
            </div>

            <Link to="/login" viewTransition>
                <button className="mt-10 bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                    Log In
                </button>
            </Link>
        </div>
    );
}

export default LogInRequired;
