import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './shareForm.scss';
import { Link, useNavigate } from "react-router-dom";
import ServerWarning from "../shared/ServerWarning";
import { apiUrl } from "../../constants/api";
import { useState } from "react";
import Image2 from '../../assets/post/3.jpeg';
import { useAvatar, useName, useToken } from "../../stores/useUserStore";

const schema = yup
	.object({
		name: yup.string().required("Title is required"),
        email: yup.string().email("Please enter your content").required("Content is required")
    })
	.required();

const ShareForm = () => {
    const avatar = useAvatar();
    const token = useToken();
    const name = useName();
    const [isLoading, setIsLoading] = useState(false);
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [file,setFile] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit() {

		const options = {
			headers: { 
                "Content-Type": "application/json",
                Authorization: "Bearer " + token 
            },
			method: "POST",
			body: JSON.stringify({title:title,body:body,media:file || ""}),
		};

		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(apiUrl, options);
			const json = await response.json();
            console.log(json);

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}
			navigate("/");

		} catch (error) {
			setError(error.toString());
		} finally {
			setIsLoading(false);
		}
	}
  return (
    <div className='share'>
        <div className='container'>
            <div className='top'>
                <div className="left">
                    <div className='user'>
                        <img src={avatar} alt='profile' className="shareImg" />
                        <p>{`Share your thoughts, ${name} ?`}</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <ServerWarning>{error}</ServerWarning>}
                <input
                    type="text"
                    placeholder='Title'
                    {...register("title")}
                    required
                />
                <input
                    type="text"
                    placeholder='Content'
                    {...register("body")}
                    required
                />
                <div className="right">
                        {/* {file && <img className='file' alt='thumb' src={URL.createObjectURL(file)} />} */}
                </div>
                <hr className="rule" />
                <div className="bottom">
                    <div className='left'>
                    {/* <input type='file' id='file' style={{display:"none"}}
                        onChange={(e) => setFile(e.target.files[0])} /> */}
                        {file && <input placeholder='Enter image url..' {...register("file")} />}
                        <div className='item' onClick={() => setFile(!file)}>
                            {file ? <button className='cancel'>Cancel</button> : <><img src={Image2} alt='post' />
                            <span>Add Image</span></>}
                        </div>
                    </div>
                    <button type="submit">Share</button>
                </div>
            </form>
        </div>
            
        </div>
  )
};
export default ShareForm;