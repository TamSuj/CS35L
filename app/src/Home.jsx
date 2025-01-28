import { FaPen } from "react-icons/fa";

function Home() {
    return (
        <div className="min-h-screen text-center bg-gray-100">
            <div className="bg-gray-600 p-7"></div>
            <h1 className="text-4xl pt-40 font-semibold text-gray-800">
                This is the home page for CS 35L project.
            </h1>
            <div className="mt-10">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-1/3 p-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
            </div>
        </div>
    );
}

export default Home;

