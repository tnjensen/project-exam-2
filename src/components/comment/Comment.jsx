import './comment.scss';
import PropTypes from 'prop-types';

function Comment({comment}){
    const author = comment.author.name;
    const avatar = comment.author.avatar;
    const content = comment.body;

    return(
        <div className='comment'>
            <div className='owner'>
            {avatar ? <img src={avatar} alt='user'/> : <img src="/assets/person/noAvatar.png" />}
                <p>{author}</p>
                <span className='comment-content'>{content}</span>
            </div>
            
        </div>
    )
    
}
Comment.propTypes = {
    comment: PropTypes.object
}
export default Comment;