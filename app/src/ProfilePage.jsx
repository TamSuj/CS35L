import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { NoteGallery } from "./Note.jsx";
import { TagBar } from "./Tag.jsx";
import headshot from './assets/notion-face.png';
import LogInRequired from "./LogInRequired.jsx";

const ProfilePage = () => {
    const { id } = useParams();  // Get user ID from URL params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/user/${id}`);
                if (!response.ok) {
                    throw new Error("User not found");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        };

        fetchUserProfile();
    }, [id]);


    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="animate-pulse text-xl text-gray-600">Loading...</div>
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <LogInRequired/>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-1"></div>
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <div className="flex items-center space-x-6">
                    <img className="w-24 h-24 rounded-full " src={user.profilePic || headshot} alt="Profile" />
                    <div className="flex-1">
                        <div className="flex mb-2">
                            <h2 className="text-2xl font-semibold text-gray-800">{user.name || "Unnamed User"}</h2>
                            <button className="pl-2" onClick={() => navigate('/profile/edit')}><FaPen /></button>
                        </div>
                        <p className="text-gray-600">{user.bio}</p>
                        <TagBar tagList={user.tags || []} />
                    </div>
                    <div className="text-right">
                        <p className="text-gray-700"><strong>{user.stats?.noteCount || 0}</strong> Notes</p>
                        <p className="text-gray-700"><strong>{user.stats?.followerCount || 0}</strong> Followers</p>
                        <p className="text-gray-700"><strong>{user.stats?.followingCount || 0}</strong> Following</p>
                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >Log Out
                        </button>
                    </div>
                </div>
            </section>

            {/*<section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">*/}
            {/*    <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>*/}
            {/*    <div className="flex space-x-4">*/}
            {/*        <div className="bg-gray-100 px-4 py-2 rounded-md">🏆 Top Contributor</div>*/}
            {/*        <div className="bg-gray-100 px-4 py-2 rounded-md">🔥 Study Streak: 30 days</div>*/}
            {/*        <div className="bg-gray-100 px-4 py-2 rounded-md">🤝 Community Moderator</div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Notes</h3>
                <NoteGallery noteList={user.posts || []} />
            </section>
        </div>
    );
};

export default ProfilePage;
