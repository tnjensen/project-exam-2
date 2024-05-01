import { useState } from 'react';
import './comments.scss';
import moment from 'moment';
import { useAvatar, useToken } from '../../stores/useUserStore';
import { apiUrl } from '../../constants/api';

function Comments({postId}){
    const avatar = useAvatar();
    const token = useToken();
    const [desc,setDesc] = useState("");

    const handleClick = async () =>{
        setDesc(desc);
        console.log(desc);
        console.log(token);
        const options = {
            method: "POST",
            body: JSON.stringify({body:desc}),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }   
        }
            await fetch(`${apiUrl}/${postId}/comment`, options)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                window.location.reload();
        }).catch(err =>{
            console.log(err);
        })
        
    }

    return(
        <div className='comments'>
            <div className="write">
            <img src={avatar} alt='profile' />
            <input type='text' placeholder='Add comment..' onChange={e=>setDesc(e.target.value)} value={desc}/>
            <button onClick={handleClick}>Send</button>
            </div>
        </div>
    )
}
export default Comments;