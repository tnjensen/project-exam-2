import { useRef, useState } from 'react';
import './postDetail.scss';
import useApi from '../../hooks/useApi.js';
import { apiUrl} from '../../constants/api';
import { useName, useToken } from '../../stores/useUserStore';
import ServerWarning from '../shared/ServerWarning';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

function PostDetail(){
    const ref = useRef();
    const currentUser = useName();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState(false);
    const [file,setFile] = useState(false);
    const token = useToken();
    const {id} = useParams();
    const {data:post} = useApi(apiUrl + `/${id}?_author=true`, token);
    const navigate = useNavigate();
    const owner = post.author;
 
    const handleError = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    async function handleUpdate(e) {
        e.preventDefault();
		const options = {
			headers: { 
                "Content-Type": "application/json", 
                Authorization: "Bearer " + token 
            },
			method: "PUT",
			body: JSON.stringify({title,body, media:file}),
		};

		try {
			const response = await fetch(apiUrl + `/${id}`, options);
			const json = await response.json();
            console.log(response);

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
                /* return setError("Please fill in all the fields.."); */
			}
            navigate("/");

		} catch (error) {
			console.log(error);
		}
	}

    const handleDelete = async (e) => {
        e.preventDefault();

        const options = {
			headers: { 
                "Content-Type": "application/json",
                Authorization: "Bearer " + token 
            },
			method: "DELETE",
		};

		try {
			const response = await fetch(apiUrl + `/${id}`, options);
			const json = await response.json();

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}
            navigate("/");

		} catch (error) {
			console.log(error);
		}
    }

    return(
        <div className='edit'>
            <Link to="/" className='back-link'><ArrowBackOutlinedIcon />Back to posts</Link>
                <h3>Edit Post</h3>
                {error && <ServerWarning>{error}</ServerWarning>}
                <form className='edit-form'>
                <label htmlFor="title">Title:</label>
                <input id='title' type="text" placeholder={post.title} onChange={e=>setTitle(e.target.value)} value={title} />
                <label htmlFor='content'>Content:</label>
                <input id='content' type="text" placeholder={post.body} onChange={e=>setBody(e.target.value)} value={body} />
                {post.media && <img src={post.media} alt='post'/>}
                {post && owner && currentUser === owner.name && <input placeholder={post.media} onChange={(e) => setFile(e.target.value)} />}
                {error ? <button style={{backgroundColor: "#1546E6", color:"white", padding:"10px"}} onClick={handleError}>OK</button> :
                post && owner && currentUser === owner.name && <><button className='edit-button' onClick={handleUpdate}>Update</button>
                <button className='delete-button' onClick={handleDelete}>Delete</button></>}
            </form>
            
        </div>
    )
}
export default PostDetail;