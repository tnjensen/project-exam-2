import { useToken } from '../../stores/useUserStore';
import Share from '../share/Share';
import Post from './post/Post';
import './posts.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SearchOutlined } from "@mui/icons-material";
import { useEffect, useState } from 'react';

function PostsQuery(){
    const queryClient = useQueryClient();
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = useToken();
    const options = {
        method: "GET",
        headers : {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
    };
    const {isPending, isError,data, error} = useQuery({
        queryKey: ['posts'],
        queryFn: () => 
           fetch(apiUrl + `?_author=true&_comments=true&_reactions=true`, options).then((res) => res.json()
        ) 
    })
   
    useEffect(() => {
        setFilteredResults(filteredResults);
      }, [filteredResults])
      
      const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = data.filter((item) => {
                return Object.values(item.title).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(data)
        }
    }
    if(isPending){
      return <span>Loading...</span>
  }
  if(isError){
      return <span>{error.message}</span>
  }
    return(
        <div className="posts">
      <Share />
      <div className="search">
              <SearchOutlined />
              <input
                type="text"
                placeholder="Search post title"
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
      {searchInput.length > 0 ? (
                filteredResults.map((post) => (
                  post.media && <Post key={post.id} post={post} />
                ))
            ) : (
            data.map((post) => (
            post.media && <Post key={post.id} post={post} />
            ))
      )}
    </div>
  );
}
export default PostsQuery;