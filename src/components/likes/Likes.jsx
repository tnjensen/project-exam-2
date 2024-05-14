import { useState } from 'react';
import './likes.scss';
import { useToken } from '../../stores/useUserStore';
import { apiUrl } from '../../constants/api';
import PropTypes from 'prop-types';

const quickMenu = [
    {title: 1, path: "", Icon: "🙂"},
    {title: 2, path: "", Icon: "😍"},
    {title: 3, path: "", Icon: "🙁"},
    {title: 4, path: "", Icon: "😠"},
]
function Likes({postId}){
    const token = useToken();
    const [like,setLike] = useState("");

    const handleClick = async (e) =>{
        const emoji = e.target.innerText;
        setLike(like);

        const options = {
            method: "PUT",
            body: JSON.stringify({symbol:emoji}),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }   
        }
            await fetch(`${apiUrl}/${postId}/react/${emoji}`, options)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                window.location.reload();
        }).catch(err =>{
            console.log(err);
        })
        
    }

    return(
        <div className='likes'>
            <div className="container">
            <ul className='flex pb-3'>
                {quickMenu.map(menuItem => {
                    const {title, Icon} = menuItem
                    return(
                        <li key={title} className='px-1' onClick={handleClick} >
                            {Icon}
                        </li>
                    )
                })}
            </ul>
            </div>
        </div>
    )
}
Likes.propTypes = {
    postId: PropTypes.number
}
export default Likes;