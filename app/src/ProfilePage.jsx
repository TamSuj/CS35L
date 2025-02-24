import React, {useState, useEffect} from "react"
import headshot from './assets/notion-face.png'
import { FaPen } from "react-icons/fa";
import {TagBar} from "./Tag.jsx";
import { useNavigate } from "react-router-dom";
import {Note, NoteGallery} from "./Note.jsx";
const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) {
        return <div>Please Log In!</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-1"></div>
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <div className="flex items-center space-x-6">
                    <img className="w-24 h-24 rounded-full " src={headshot} alt="Profile"/>
                    <div className="flex-1">
                        <div className="flex mb-2">
                            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                            <button className="pl-2" onClick={() => navigate('/profile/edit')}><FaPen/></button>
                        </div>
                        <p className="text-gray-600">{user.bio}</p>
                        <TagBar tagList={user.tags || []}/>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-700"><strong>{user.noteCount || 0}</strong> Notes</p>
                        <p className="text-gray-700"><strong>{user.followerCount || 0}</strong> Followers</p>
                        <p className="text-gray-700"><strong>{user.followingCount || 0}</strong> Following</p>
                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >Log Out
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="flex space-x-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-md">🏆 Top Contributor</div>
                    <div className="bg-gray-100 px-4 py-2 rounded-md">🔥 Study Streak: 30 days</div>
                    <div className="bg-gray-100 px-4 py-2 rounded-md">🤝 Community Moderator</div>
                </div>
            </section>

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Notes</h3>
                <NoteGallery noteList={user.posts || []}/>
            </section>
        </div>
    );
};

export default ProfilePage;