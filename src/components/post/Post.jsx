import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './post.scss';
import moment from 'moment';
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHoriz } from '@mui/icons-material';
import { useState } from 'react';

function Post({post}){
    const [commentOpen,setCommentOpen] = useState(false);
    /* const {user} = useAuth(); */
    return(
        <div className='post'>
            <div className='container'>
                {/* <div className='user'>
                    <div className='userInfo'>
                        <div>{user}</div>
                        <div className='details'>
                            <Link to={`/profile/${user}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className='name'>{user}</span>
                            </Link>
                            <span className='date'>{moment(post.created).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHoriz />
                </div> */}
                <div className='content'>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {post.media && <img src={post.media} alt='post'/>}
                </div>
                <div className='info'>
                    {/* <div className='item'>
                        {data.includes(currentUser.id) ? <FavoriteOutlined style={{color:"red"}} onClick={handleLike} /> : <FavoriteBorderOutlined onClick={handleLike} />}
                            {data.length} likes
                    </div> */}
                    <div className='item' onClick={() =>setCommentOpen(!commentOpen)}>
                            12 comments
                    </div>
                    <div className='item'>
                            Share
                    </div>
                </div>
                {/* {commentOpen && <Comments postId={post.id} />} */}
            </div>
        </div>
    )
}
export default Post;