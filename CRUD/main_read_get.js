import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/*
CRUD Applications:
R - Read 
C - Create 
U - Update 
D - Delete/Destroy
*/

import './bootstrap.css';
import './styles.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    
    const handleDelete = async (postIdToDelete) => {
        const response = await fetch(` ${postIdToDelete}`, {
            method: 'DELETE',
        });
        const data = await response.jason();
        console.log('data', data);
        if(data) {
            const newPosts = posts.filter(post => post.id !== postIdToDelete);
            setPosts(newPosts);
        }
    }

    useState(() => {
        const fetchPosts = async () => {
            const response = await fetch ();
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, [])

    return <>
    <h1>
        Posts
    </h1>
    {
        postId
        ? <Update posts={posts} setPosts={setPosts} postId={postId} setPostId={setPostId} />
        : <Create posts={posts} setPosts={setPosts} />  
    }
    {
        posts.map(post => <div key={post.id}>
            <h3>{post.tile}</h3>
            <div>{post.body}</div>
            <button type="button" className="btn btn-outline-primary" onClick={() => setPostId(post.id)}>Edit</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(post.id)}>Delete</button>
        </div>)
    }
            
    </>
}


ReactDOM.render(<App />, document.getElementById('App'));
