import {useEffect, useState} from 'react'
import axios from 'axios'

const Posts = () => {
     const [reload, setReload] = useState(false)
    const [posts, Setposts] = useState(null)
    const handleCreatePost = e => {
        e.preventDefault()
        const fromData = new FormData(e.target)
        const post = Object.fromEntries(fromData)

        axios
        .post("http://localhost:3003/post", post)
        .then(res => {
        console.log(res);
        e.target.reset()
        setReload(prev => !prev)
        })
    }
    const handleDeletePost = (id) => {
        axios
        .delete(`http://localhost:3003/post/${id}`)
        .then(() => {
            setReload((prev) => !prev);
        })
        .catch((err) => console.error(err));
    };
    useEffect(()=> {
        axios
        .get("http://localhost:3003/post")
        .then(res => Setposts(res.data)) 
    },[reload])
  return (
    <div>
        <form className='inputs' action="" onSubmit={handleCreatePost}>
            <input type="text" name='img' placeholder='img'/>
            <input type="text" name='title' placeholder='title' />
            <input type="text" name='desc' placeholder='description' />
            <button>Create</button>
        </form>
        <br />
        <br />
        <div className='header'>
        {
            posts?.map((posts)=> (
            <div className="card" key={posts.id}>
            <img className="card_img" src={posts.img} alt={posts.title} />
            <h3>{posts.title}</h3>
            <p>{posts.desc}</p>
            <button onClick={() => handleDeletePost(posts.id)}>Delete</button>
            <hr />
            </div>        
            ))
        }
        </div>  
    </div>
  )
}

export default Posts