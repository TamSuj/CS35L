function NavBar() {
    return (
        <div>
            <header className="bg-white p-4 flex justify-between">
                {/*Left logo*/}
                <h1 className="text-xl font-bold text-gray-800">StudyGram</h1>

                {/*Right menus*/}
                <div>
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