import React, { useEffect, useState } from 'react';
const LikeButton = ({ postId, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false); // State to track if the post is liked

    useEffect(() => {
        // Fetch the current liked state and like count of the post from the server
        const fetchLikedState = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                try {
                    // Call the new endpoint to get the liked state and like count
                    const response = await fetch(`http://localhost:3001/api/post/${postId}/liked?userId=${user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch liked state');
                    }

                    const data = await response.json();
                    setLiked(data.liked); // Set the liked state based on the server response
                    setLikes(data.likeCount); // Update like count from the server
                } catch (error) {
                    console.error('Error fetching liked state', error);
                }
            }
        };

        fetchLikedState();
    }, [postId]); // This will rerun when postId changes

    const handleLike = async () => {
        // Get the logged-in user's userId from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            alert("You must be logged in to like a post.");
            return;
        }
        try {
            let response;
            response = await fetch(`http://localhost:3001/api/post/${postId}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setLikes(data.likeCount);
            setLiked(!liked);
        } catch (error) {
            console.error("Error toggling the like state", error);
        }
    };

    return (
        <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleLike}>
            <span style={{ fontSize: '2rem' }}>
                {liked ? '❤️' : '🤍'} 
            </span>
            <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                {likes} {likes === 1 ? 'like' : 'likes'} 
            </div>
        </div>
    );
};

export default LikeButton;