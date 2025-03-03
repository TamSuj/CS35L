import React, { useEffect, useState } from 'react';
const LikeButton = ({ postId, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false); 

    useEffect(() => {
        const fetchLikedState = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                try {
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
                    setLiked(data.liked); 
                    setLikes(data.likeCount); 
                } catch (error) {
                    console.error('Error fetching liked state', error);
                }
            }
        };

        fetchLikedState();
    }, [postId]); 

    const handleLike = async () => {
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
