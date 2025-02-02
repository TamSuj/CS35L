function NavBar() {
    return (
        <div>
            <header className="bg-white p-4 flex justify-between">
                {/*Left logo*/}
                <h1 className="text-xl font-bold text-gray-800 p-2">StudyGram</h1>

                {/*Search bar*/}
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-1/3 p-2 pl-5 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />

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

