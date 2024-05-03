import { Link } from 'react-router-dom';
import './postDetails.scss';

function PostDetails({postId}){
    return(
        <div className='more'>
            <Link to={`/detail/${postId}`}>View details</Link>
        </div>
    )
}
export default PostDetails;