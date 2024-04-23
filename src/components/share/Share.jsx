import { useAvatar, useName } from '../../stores/useUserStore';
import './share.scss';
import Image2 from '../../assets/post/3.jpeg';
import Image1 from '../../assets/person/4.jpeg';
import Image3 from '../../assets/person/5.jpeg';

export default function Share() { 
    const avatar = useAvatar();
    const name = useName();
    
    /* const upload = async () =>{
        try{
            const formData = new FormData();
            formData.append("file", file);
            await makeRequest.post("/upload", formData);
        }
        catch(err){
            console.log(err);
        }
    } */
    const handleClick = async (e) =>{
        e.preventDefault();
        /* if(file) await upload();
        let imgUrl = Date.now() + file.name;
        setDesc("");
        setFile(null);
        mutation.mutate({desc, img:imgUrl}) */
    }

  return (
    <div className="share">
        <div className="container">
            <div className="top">
                <div className="left">
                    <img src={avatar} alt='profile' className="shareImg" />
                    <input placeholder={`What's on your mind, ${name} ?`} />
                </div>
                <div className="right">
                    {/* {file && <img className='file' alt='thumb' src={URL.createObjectURL(file)} />} */}
                </div>
            </div>
            <hr className="rule" />
            <div className='bottom'>
                <div className='left'>
                    {/* <input type='file' id='file' style={{display:"none"}}
                        onChange={(e) => setFile(e.target.files[0])} /> */}
                    <label htmlFor='file'>
                        <div className='item'>
                            <img src={Image2} alt='post' />
                            <span>Add Image</span>
                        </div>
                    </label>
                    <div className='item'>
                        <img src={Image1} alt='map' />
                        <span>Add Place</span>
                    </div>
                    <div className='item'>
                        <img src={Image3} alt='friend' />
                        <span>Tag Friends</span>
                    </div>
                </div>
                <div className='right'>
                    <button onClick={handleClick}>Share</button>
                </div>
           </div>
        </div>
    </div>
  )
}