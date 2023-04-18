import { useEffect, useState } from "react"
import "./Posts.css"
export function Posts({ currentUser }) {
    const [posts, setPosts] = useState([])
  // useEffect(() => {
     //   fetch("http://127.0.0.1:3000/posts", { credentials: "include" })
     //       .then((response) => response.json())
     //       .then(posts => {
     //           console.log(posts)
     //           if (posts) setPosts(posts)
     //       })
    //}, [])
    const deleting = (postid) => {
        return () => {
            fetch(`http://127.0.0.1:3000/posts/${postid}`, {
                method: "DELETE",
                credentials: "include"
            })
        }
    }

    const liking = (postid) => {
        return () => { 
            fetch(`http://127.0.0.1:3000/posts/${postid}/like`, {
            method: "POST",
            credentials: "include"
        })
}
    }
    const posting = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:3000/posts/posts", {
            method: "POST",
            header: { "Content-type": "application/json" },
            body: JSON.stringify({ content: event.target.createText.value}),
            credentials: "include"
        })

    }
    return (
        <main><form onSubmit={posting}><textarea name= "createText"  />
            <button>Publish</button>
        </form>{
            posts.map(post => {
                return (<article key={post.id}>
                    <p className = "Post-author">Author : {post.userName}</p>
                    <p className = "Post-content">{post.content}</p>
                    <p className="Post-likes">Likes {post.likes}</p>
                    <button onClick={liking(post.id)}>like</button>
                    {currentUser === post.userName ? < button onClick={deleting(post.id)}>delete</button> : <></>}
                </article>)
            })
        }</main>

        )
}