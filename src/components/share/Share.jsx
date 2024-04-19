import { useAvatar, useName } from '../../stores/useUserStore';
import './share.scss';
import Image2 from '../../assets/post/3.jpeg';
import Image1 from '../../assets/person/4.jpeg';
import Image3 from '../../assets/person/5.jpeg';


function Share(){
    const avatar = useAvatar();
    const name = useName();

    return(
        <div className="share">
            <div className="left">
                <img src={avatar} alt="" />
                <input type='text' placeholder={`What are you thinking about, ${name} ?`} />
            </div>
            <div className='right'>
                <img src={Image1} alt='' />
                <span>Add image</span>
                <img src={Image2} alt='' />
                <span>Add place</span>
                <img src={Image3} alt='' />
                <span>Tag friends</span>
                <button className='share-button'>Share</button>
            </div>
        </div>
    )
}
export default Share;