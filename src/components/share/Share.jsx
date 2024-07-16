import { useAvatar, useName, useToken } from '../../stores/useUserStore';
import './share.scss';
import Image2 from '../../assets/post/3.jpeg';
import { useState } from 'react';

export default function Share() { 
    const apiUrl = import.meta.env.VITE_API_URL;
    const avatar = useAvatar();
    const token = useToken();
    const name = useName();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [file,setFile] = useState(false);
    const [error,setError] = useState(false);
    
    const upload = async () =>{
        const options = {
			headers: { 
                "Content-Type": "application/json", 
                Authorization: "Bearer " + token 
            },
			method: "POST",
			body: JSON.stringify({title:title,body:body,media:file || ""}),
		};

		try {
			const response = await fetch(apiUrl, options);
			const json = await response.json();

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}
            
			window.location.reload();

		} catch (error) {
			setError(error.toString());
        }
    }
    
    const handleClick = async (e) =>{
        e.preventDefault();
        await upload();
       /*  if (file) await upload();
        let imgUrl = Date.now() + file.name; */
        setFile(file);
    }

  return (
    <div className="share">
        <div className="container">
            <div className="top">
                <div className="left">
                    <div className='user'>
                        {avatar ? (
                            <img src={avatar} alt='profile' className="shareImg" />
                        ) : (
                            <img src="/assets/person/noAvatar.png" alt='profile' className="shareImg" />
                        )}
                       
                        <p>{`Share your thoughts, ${name} ?`}</p>
                    </div>
                    <input placeholder={`Title`} onChange={(e) => setTitle(e.target.value)} />
                    <input placeholder={`Content`} onChange={(e) => setBody(e.target.value)} />
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
                        {file && <input placeholder={`Enter image url..`} onChange={(e) => setFile(e.target.value)} />}
                        <div className='item' onClick={() => setFile(!file)}>
                            {file ? <button className='cancel'>Cancel</button> : <><img src={Image2} alt='post' />
                            <span>Add Image</span></>}
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