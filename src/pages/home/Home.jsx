import { Helmet } from 'react-helmet-async';
import Posts from '../../components/posts/Posts';
import './home.scss';

function Home(){
    return(
        <div className='home'>
            <Helmet>
            <title>Sentire</title>
            </Helmet>
            <Posts />
        </div>
        
    )
}
export default Home;