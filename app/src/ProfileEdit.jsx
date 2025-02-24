import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const [tag, setTag] = useState([]);
    const [userId, setUserId] = useState(null);  // New state for userId
    const navigate = useNavigate();

    useEffect(() => {
        // Get userId from localStorage or context
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setUserId(user.id); // Set the userId from the localStorage
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError("User not logged in.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

            const response = await fetch('/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    firstName,
                    lastName,
                    bio,
                    tag,
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Profile Update failed');
            }

            // If successful, redirect to profile page
            navigate('/profile');
        } catch (error) {
            console.error('Error during profile update:', error);
            setError(error.message);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-1"></div>
            <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="firstName"
                                   className="block mb-2 text-sm font-medium">First name</label>
                            <input type="text" id="firstName"
                                   value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="John" required/>
                        </div>
                        <div>
                            <label htmlFor="lastName"
                                   className="block mb-2 text-sm font-medium">Last name</label>
                            <input type="text" id="lastName"
                                   value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="Doe" required/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium">Bio</label>
                        <input type="text" id="bio"
                               value={bio}
                               onChange={(e) => setBio(e.target.value)}
                               className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="Aspiring coffee-fueled scholar"/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="interest"
                               className="block mb-2 text-sm font-medium">Interests</label>
                        <input
                            type="text"
                            id="tags"
                            value={tag.join(", ")}
                            onChange={(e) => setTag(e.target.value.split(",").map(t => t.trim()))}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="e.g., AI, Web Dev, UI/UX"
                        />
                    </div>
                    <button type="submit"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Save
                    </button>
                </form>
            </section>
        </div>
    );
}

export default ProfileEdit;
