import Posts from '../../components/posts/Posts';
import Share from '../../components/share/Share';
import './home.scss';

function Home(){
    return(
        <div className='home'>
            <Posts />
        </div>
        
    )
}
export default Home;