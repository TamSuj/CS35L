import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { NoteGallery } from "./Note.jsx";
import { TagBar } from "./Tag.jsx";
import headshot from './assets/notion-face.png';
import LogInRequired from "./LogInRequired.jsx";
import PostPopup from "./PostPopup";
import PostListing from "./PostListing.jsx";
import DeleteButton from "./DeleteButton";
import EditButton from './EditButton';
import LikeButton from "./LikeButton";

const ProfilePage = () => {
    const {id} = useParams();  // Get user ID from URL params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Posts, setPosts] = useState([]);
    const [noteCount, setNoteCount] = useState(0);
    const navigate = useNavigate();
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/user/${id}`);
                if (!response.ok) {
                    throw new Error("User not found");
                }
                const data = await response.json();
                setUser(data);

                if (data.posts.length > 0) {
                    const postResponses = await Promise.all(
                        data.posts.map(postId =>
                            fetch(`/api/post/${postId}`)
                            .then(res => res.ok ? res.json() : null)
                        )
                    );
                    const validPosts = postResponses.filter(post => post !== null);
                    setPosts(validPosts);
                    setNoteCount(validPosts.length);
                }
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
        window.dispatchEvent(new Event("storage"));
        navigate('/login');
    };

    const postListings = Posts.map((post) => (
        <div key={post._id} onClick={() => setSelectedPost(post)}>
            <PostListing post={post}/>
        </div>
    ))

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

    const renderNotes = (notes) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <div key={note.postID} onClick={() => setSelectedPost(note)} className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-gray-800 text-2xl">📄</div>
                        <p className="mt-2 font-semibold text-gray-800">{note.postTitle}</p>
                        <p className="text-gray-600 text-sm">
                            {note.createdAt ? new Date(note.createdAt).toDateString() : "Unknown Date"}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-gray-600 text-sm">
                            {/* LikeButton on the left */}
                            <div className="flex items-center space-x-2">
                                <LikeButton 
                                    postId={note._id}
                                    variant="icon"
                                />
                            </div>
        
                            <div className="flex items-center space-x-4">
                                <EditButton 
                                    postId={note._id} 
                                    variant="icon" 
                                />
                                <DeleteButton 
                                    postId={note._id} 
                                    variant="icon" 
                                    onClick={(event) => handleDeleteClick(event)} 
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const calculateAchievements = (stats) => {
        const achievements = [];

        if (noteCount >= 5) {
            achievements.push({icon: "🏆", title: "Top Contributor"});
        }
        if (stats?.followerCount >= 10) {
            achievements.push({icon: "🤝", title: "Community Moderator"});
        }
        if (noteCount >= 30) {
            achievements.push({icon: "🔥", title: `Study Streak: ${noteCount} days`});
        }

        return achievements;
    };

    const achievements = calculateAchievements(user.stats);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-1"></div>
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <div className="flex items-center space-x-6">
                    <img className="w-24 h-24 rounded-full " src={user.profilePic || headshot} alt="Profile"/>
                    <div className="flex-1">
                        <div className="flex mb-2">
                            <h2 className="text-2xl font-semibold text-gray-800">{user.name || "Unnamed User"}</h2>
                            <button className="pl-2" onClick={() => navigate('/profile/edit')}><FaPen/></button>
                        </div>
                        <p className="text-gray-600">{user.bio}</p>
                        <TagBar tagList={user.tags || []}/>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-700"><strong>{noteCount || 0}</strong> Notes</p>
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

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="flex space-x-4">
                    {achievements.length > 0 ? (
                        achievements.map((achievement, index) => (
                            <div key={index} className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">
                                {achievement.icon} {achievement.title}
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-100 px-4 py-2 rounded-md">No Achievements Yet</div>
                    )}
                </div>
            </section>

            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Notes</h3>
                {renderNotes(Posts)}
            </section>
            <div className="feed-page-content">
                {selectedPost && (
                    <PostPopup post={selectedPost} onClose={() => setSelectedPost(null)}/>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
