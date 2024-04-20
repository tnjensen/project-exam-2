import Posts from '../../components/posts/Posts';
import MyShare from '../../components/share/MyShare';
import Share from '../../components/share/Share';
import './home.scss';

function Home(){
    return(
        <div className='home'>
            <MyShare />
            <Posts />
        </div>
        
    )
}
export default Home;