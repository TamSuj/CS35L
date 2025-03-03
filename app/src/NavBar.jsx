import SearchBar from "./SearchBar.jsx";

function NavBar() {
    return (
        <div>
            <header className="bg-white p-4 flex justify-between">
                {/*Left logo*/}
                <h1 className="text-xl font-bold text-gray-800 p-2">StudyGram</h1>

                <SearchBar/>

                {/*Right menus*/}
                <div className="p-2">
                    <a className="p-4" href="">Home
                    </a>
                    <a className="p-4" href="">Profile
                    </a>
                </div>
            </header>
        </div>
    );
}

export default NavBar

