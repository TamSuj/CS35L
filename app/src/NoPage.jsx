import graphic from './assets/women-typing.png'
import {useNavigate} from "react-router-dom";
export default function NoPage() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="min-h-screen text-center">
                <div className="container max-w-screen-sm mx-auto mt-8">
                    <img className="mx-auto" src={graphic} alt="A women typing"/>
                </div>

                <div className="ml-6 mr-6">
                    <h1 className="text-5xl font-semibold">404 Not Found</h1>
                    <h1 className="text-2xl pt-10 text-gray-800">
                        Oops, seems like the page you're looking for doesn't exist.
                    </h1>
                </div>

                <button className="mt-10 bg-gray-600 text-white p-2 pl-3 pr-3 rounded-full hover:bg-gray-800" onClick={() => navigate('/')}>
                    Go to homepage
                </button>

            </div>
        </div>
    );
}

