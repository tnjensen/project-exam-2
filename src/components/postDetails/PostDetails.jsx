import { Link } from 'react-router-dom';
import './postDetails.scss';

function PostDetails({postId}){
    return(
        <div className='more'>
            <Link to="/detail/:id">View and edit</Link>
        </div>
    )
}
export default PostDetails;