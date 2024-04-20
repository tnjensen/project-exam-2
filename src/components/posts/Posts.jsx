import {apiUrl} from '../../constants/api.js';
import './posts.scss';
import useApi from '../../hooks/useApi.js';
import Post from '../post/Post.jsx';
import { useToken} from '../../stores/useUserStore.jsx';

function Posts(){
    const token = useToken();
    const {data:posts,isLoading,isError} = useApi(apiUrl,token);
    console.log(posts);
    
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>Error loading posts.</div>
    }
    return(
        <div className="posts">
            {posts.map((post) => (
                post.media && <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
export default Posts;