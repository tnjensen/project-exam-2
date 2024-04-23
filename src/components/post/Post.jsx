import { Link } from 'react-router-dom';
import './post.scss';
import moment from 'moment';
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHoriz } from '@mui/icons-material';
import { useState } from 'react';
import { useAvatar, useName } from '../../stores/useUserStore';
import Comments from '../comments/Comments';
import Likes from '../likes/Likes';

function Post({post}){
    const [commentOpen,setCommentOpen] = useState(false);
    const [liked,setLiked] = useState(false);
    const user = useName();
    const avatar = useAvatar();

    const handleLike = () =>{
        if(liked){
            return true;
        }else{
            return false;
        }
    }
    return(
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        <img src={avatar} alt='user'/>
                        <div className='details'>
                            <Link to={`/profile/${user}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className='name'>{user}</span>
                            </Link>
                            <span className='date'>{moment(post.created).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHoriz />
                </div>
                <div className='content'>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {post.media && <img src={post.media} alt='post'/>}
                </div>
                <div className='info'>
                    <div className='item' onClick={() => setLiked(!liked)}>
                        {user ? <FavoriteOutlined style={{color:"red"}} onClick={handleLike} /> : <FavoriteBorderOutlined onClick={handleLike} />}
                            {post._count.reactions} likes
                    </div>
                    <div className='item' onClick={() =>setCommentOpen(!commentOpen)}>
                            {post._count.comments} comments
                    </div>
                    <div className='item'>
                            Share
                    </div>
                </div>
                {liked && <Likes postId={post.id} />}
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    )
}
export default Post;