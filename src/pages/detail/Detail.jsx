import Header from '../../components/header/Header';
import Post from '../../components/post/Post';
import './detail.scss';

function Detail({post}){

    return(
        <div className='detail'>
            <Header />
            <Post postId={post.id} />
        </div>
    )
}
export default Detail;