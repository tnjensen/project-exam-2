import { Link } from 'react-router-dom';
import './post.scss';
import moment from 'moment';
import { MoreHoriz } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { useAvatar, useName } from '../../stores/useUserStore';
import Comments from '../comments/Comments';
import Likes from '../likes/Likes';
import Comment from '../comment/Comment';
import Like from '../like/Like';
import { useOutsideClick } from '../../hooks/useOutsideClick';

function Post({post}){
    const [commentOpen,setCommentOpen] = useState(false);
    const [liked,setLiked] = useState(false);
    const [detail,setDetail] = useState(false);
    const author = post.author.name;
    const avatar = post.author.avatar;
    const comments = post.comments;
    const likes = post.reactions;
    const emoji = post.reactions.symbol;
    const [display,setDisplay] = useState(false);
    const ref = useRef();

    useOutsideClick(ref, ()=> {
        setDisplay(false);
    })

    return(
        <div className='post'>
            <div className='container'>
                <div className='user'>
                    <div className='userInfo'>
                        {avatar ? <img src={avatar} alt='user'/> : <img src="/assets/person/noAvatar.png" />}
                        <div className='details'>
                            <span className='name'>{author}</span>
                            <span className='date'>{moment(post.created).fromNow()}</span>
                        </div>
                    </div>
                    <div className='details' ref={ref}>
                    <MoreHoriz onClick={() => setDisplay(!display)} />
                    {display && <div className='more'>
                            <Link to={`/detail/${post.id}`}>View details</Link>
                        </div>}
                    </div>         
                </div>
                <div className='content'>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    {post.media && <img src={post.media} alt='post'/>} 
                    <div className='likes'>{likes.map((like, index) =>(
                        <Like key={index} like={like} />
                        /* Index is used as key since the list is static and won't be re-ordered */
                        ))}
                    </div>
                </div>
                <div className='info'>
                    <div className='item' onClick={() => setLiked(!liked)}>
                            {post._count.reactions} likes
                    </div>
                    <div className='item' onClick={() =>setCommentOpen(!commentOpen)}>
                            {post._count.comments} comments
                    </div>
                </div>
                {liked && <Likes postId={post.id} />}
                
                {commentOpen && <Comments postId={post.id} />}
                {commentOpen && comments.map((comment) => (
                    comment && <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    )
}
export default Post;