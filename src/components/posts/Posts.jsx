import {apiUrl} from '../../constants/api.js';
import './posts.scss';
import useApi from '../../hooks/useApi.js';
import Post from '../post/Post.jsx';
import { useToken} from '../../stores/useUserStore.jsx';
import Share from "../share/Share";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState } from 'react';

function Posts(){
    const [shareOpen,setShareOpen] = useState(false);
    const token = useToken();
    const {data:posts,isLoading,isError} = useApi(`${apiUrl}?_author=true&_comments=true&_reactions=true`,token);
    console.log(posts);

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error loading posts.</div>
    }
    return(
        
        <div className="posts">
            {shareOpen ?<><RemoveOutlinedIcon className="add-post" onClick={() => setShareOpen(!shareOpen)} /><Share /></> : <AddOutlinedIcon className="add-post" onClick={() => setShareOpen(!shareOpen)} /> } 
            {posts.map((post) => (
                post.media && <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
export default Posts;