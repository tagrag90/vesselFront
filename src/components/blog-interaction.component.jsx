import { useContext, useEffect } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Toaster, toast } from "react-hot-toast"
import axios from "axios";

const BlogInteraction = () => {

    let { blog, blog: { _id, title, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username } }  }, setBlog, islikedByUser, setLikedByUser, setCommentsWrapper } = useContext(BlogContext);

    let { userAuth: { username, access_token } } = useContext(UserContext);

    useEffect(() => {

        if( access_token ){
            // make request to server to get like information
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", { _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data: { result } }) => {
                setLikedByUser(Boolean(result))
            })
            .catch(err => {
                console.log(err);
            })
        }

    }, [])

    const handleLike = () => {

        if(access_token){
            // like the blog
            setLikedByUser(preVal => !preVal);

            !islikedByUser ? total_likes++ : total_likes--;

            setBlog({ ...blog, activity: { ...activity, total_likes } })

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-blog", { _id, islikedByUser }, {
                headers: { 
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err =>{
                console.log(err);
            })
            
        } 
        else{
            // not logged in
            toast.error("please login to like this blog")
        }

    }

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success("링크가 복사되었습니다");
            })
            .catch(() => {
                toast.error("링크 복사에 실패했습니다");
            });
    }

    return (
        <>
            <Toaster />
            <div className="flex justify-center gap-8 py-8 border-y border-black/10">
                <div className="flex gap-6 items-center">
                    <button
                        onClick={handleLike}
                        className={"flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-100 " + ( islikedByUser ? "bg-red/10 text-red hover:bg-red/20" : "bg-grey hover:bg-black/5" )}
                    >
                        <i className={"fi " + ( islikedByUser ? "fi-sr-heart" : "fi-rr-heart" )}></i>
                        <span className="text-base">{ total_likes || 0 }</span>
                    </button>

                    <button
                        onClick={() => setCommentsWrapper(preVal => !preVal)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-grey hover:bg-black/5 transition-all duration-100"
                    >
                        <i className="fi fi-rr-comment-dots"></i>
                        <span className="text-base">{ total_comments || 0 }</span>
                    </button>

                    <button 
                        onClick={handleCopy} 
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-grey hover:bg-black/5 hover:text-purple transition-all duration-100"
                    >
                        <i className="fi fi-rr-copy"></i>
                        <span className="text-base">Share</span>
                    </button>

                    {username == author_username && (
                        <Link 
                            to={`/editor/${blog_id}`} 
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-grey hover:bg-black/5 hover:text-purple transition-all duration-100"
                        >
                            <i className="fi fi-rr-edit"></i>
                            <span className="text-base">Edit</span>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default BlogInteraction;