import Header from '../header/Header';
import Post from '../post/Post';
import './postDetail.scss';

function PostDetail({postId}){
    console.log(postId);
    return(
        <div className='detail'>
            <Header />
           {/*  <Post postId={post.id} /> */}
        </div>
    )
}
export default PostDetail;