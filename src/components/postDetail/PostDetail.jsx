import { useState } from 'react';
import './postDetail.scss';
import { apiUrl} from '../../constants/api';
import { useToken } from '../../stores/useUserStore';
import ServerWarning from '../shared/ServerWarning';

function PostDetail({post}){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
    const token = useToken();

    const handleError = () => {
        window.location.reload();
    }

    async function handleUpdate() {

		const options = {
			headers: { 
                "Content-Type": "application/json", 
                Authorization: "Bearer " + token 
            },
			method: "PUT",
			body: JSON.stringify({title,body}),
		};

		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${apiUrl}/${post.id}`, options);
			const json = await response.json();

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}

			window.location.reload();

		} catch (error) {
			setError(error.toString());
		} finally {
			setIsLoading(false);
		}
	}

    const handleDelete = async () => {
        const options = {
			headers: { 
                "Content-Type": "application/json",
                Authorization: "Bearer " + token 
            },
			method: "DELETE",
		};

		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(`${apiUrl}/${post.id}`, options);
			const json = await response.json();

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}

			window.location.reload();

		} catch (error) {
			setError(error.toString());
		} finally {
			setIsLoading(false);
		}
    }

    return(
        <div className='edit'>
            {error && <ServerWarning>{error}</ServerWarning>}
            <div className='left'>
                <input type="text" placeholder={post.title} onChange={e=>setTitle(e.target.value)} value={title} />
                <input type="text" placeholder={post.body} onChange={e=>setBody(e.target.value)} value={body} />
                {/* <input type{post.media && <img src={post.media} alt='post'/>} /> */}
            </div>
            <div className='right'>
            {error ? <button style={{backgroundColor: "#1546E6", color:"white", padding:"10px"}} onClick={handleError}>OK</button> :
                <><button className='edit-button' onClick={handleUpdate}>Update</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button></>}
            
            </div>
            
        </div>
    )
}
export default PostDetail;