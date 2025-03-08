import React, { useEffect, useState } from 'react';
const DeleteButton = ({ postId }) => {
    const [isPoster, setIsPoster] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    useEffect(() => {
        const fetchIsPoster = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id){
                try{
                    const response = await fetch(`http://localhost:3001/api/post/${postId}/isPoster?userId=${user.id}`, { //error 
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if(!response.ok){
                        throw new Error('Failed to fetch IsPoster');
                    }

                    const data = await response.json();
                    console.log(data);
                    if(data.isPoster){
                        setIsPoster(true);
                    };

                } catch(error) {
                    console.error('Error fetching isPoster', error);
                    alert(`dun: ${error.message}`);
                }
            }
        };
        fetchIsPoster();
    }, [postId]);

    const handleDelete = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("Confirmation is set to: ", confirmation);
        if(!user || !user.id){
            return; //error
        }
            if(confirmation){
            try{
                const response = await fetch(`http://localhost:3001/api/post/${postId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                if (response.ok){
                    alert('Post deleted successfully.');
                    window.location.href = '/feed';
                } else {
                    alert('Error deleting the post.');
                }
            } catch(error) {
                console.error('Error deleting post', error);
                alert('Error deleting post');
            }
        } else {
            setConfirmation(true);
        }
    };
    console.log("Is Poster: ", isPoster);
    if (!isPoster) return null;
    return (
        <button className = "delete-button" onClick = { handleDelete }>
            {confirmation ? 'Are you sure?' : 'Delete Post'}
        </button>
    )
};

export default DeleteButton;