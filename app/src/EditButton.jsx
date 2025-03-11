import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

const EditButton = ({ postId }) => {
    const [isPoster, setIsPoster] = useState(false);
    const navigate = useNavigate();
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
    const handleEdit = async() => {
         navigate(`/post/${postId}/edit`);
    }
    if(!isPoster)
    {
        return null;
    }
    return(
        <button onClick={handleEdit} className="edit-button">
            Edit Post
        </button>
    )
};

export default EditButton;