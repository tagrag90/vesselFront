import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer, { fetchComments } from "../components/comments.component";
import { Helmet } from 'react-helmet-async';
import AdSense from "../components/AdSense";

export const blogStructure = {
    title: '',
    des: '',
    conent: [],
    author: { personal_info: { } },
    banner: '',
    publishedAt: '',
}

export const BlogContext = createContext({ });

const BlogPage = () => {

    let { blog_id } = useParams()

    const [ blog, setBlog ] = useState(blogStructure);
    const [ similarBlogs, setSimilrBlogs ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ islikedByUser, setLikedByUser ] = useState(false);
    const [ commentsWrapper, setCommentsWrapper ] = useState(false);
    const [ totalParentCommentsLoaded, setTotalParentCommentsLoaded ] = useState(0);

    let { title, des, content, banner, author: { personal_info: { fullname, username: author_username , profile_img } }, publishedAt } = blog;

    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
        .then(async ({ data: { blog } }) => {

            blog.comments = await fetchComments({ blog_id: blog._id, setParentCommentCountFun: setTotalParentCommentsLoaded })
            setBlog(blog)

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: blog.tags[0], limit: 6, eliminate_blog: blog_id })
            .then(({ data }) => {

                setSimilrBlogs(data.blogs);
            })

            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    useEffect(() => {

        resetStates();

        fetchBlog();

    }, [blog_id])

    const resetStates = () => {
        setBlog(blogStructure);
        setSimilrBlogs(null);
        setLoading(true);
        setLikedByUser(false);
        setCommentsWrapper(false);
        setTotalParentCommentsLoaded(0);
    }

    // banner URL을 절대 경로로 변환하는 함수
    const getFullImageUrl = (url) => {
        if (!url || url.includes('defaultbanner.jpeg')) {
            return `${window.location.origin}/images/defaultbanner.jpeg`; // 기본 이미지
        }
        if (url.startsWith('http')) return url;
        return `${import.meta.env.VITE_SERVER_DOMAIN}${url}`;
    };

    // OpenGraph 이미지 URL 결정
    const getOgImageUrl = () => {
        // banner가 있고 유효한 URL인 경우
        if (banner && banner.trim().length > 0 && !banner.includes('defaultbanner.jpeg')) {
            return getFullImageUrl(banner);
        }
        
        // 기본 이미지 사용
        return `${window.location.origin}/images/defaultbanner.jpeg`;
    };

    return (
        <>
            {!loading && blog && (
                <Helmet>
                    <title>{title || 'Vessel'}</title>
                    <meta name="description" content={des || '내 마음이 내 기록이 되는 공간'} />

                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={title || 'Vessel'} />
                    <meta property="og:description" content={des || '내 마음이 내 기록이 되는 공간'} />
                    <meta property="og:image" content={getOgImageUrl()} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:url" content={`${window.location.origin}/blog/${blog_id}`} />
                    <meta property="og:site_name" content="Vessel" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title || 'Vessel'} />
                    <meta name="twitter:description" content={des || '내 마음이 내 기록이 되는 공간'} />
                    <meta name="twitter:image" content={getOgImageUrl()} />

                    <meta property="article:published_time" content={publishedAt || ''} />
                    <meta property="article:author" content={fullname || ''} />
                    {blog.tags && blog.tags.map(tag => (
                        <meta property="article:tag" content={tag} key={tag} />
                    ))}
                </Helmet>
            )}

            <AnimationWrapper>
                {loading ? <Loader /> : 
                    <BlogContext.Provider value={{ blog, setBlog, islikedByUser, setLikedByUser, commentsWrapper, setCommentsWrapper, totalParentCommentsLoaded, setTotalParentCommentsLoaded }}>
                        <CommentsContainer />
                        <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
                            {/* 항상 이미지를 표시하되, URL은 조건에 따라 결정 */}
                            <img 
                                src={getFullImageUrl(banner)} 
                                className="aspect-video rounded-[20px] w-full object-cover"
                                alt={title || 'Blog banner'}
                                onError={(e) => {
                                    console.error('Image load error:', e);
                                    e.target.src = `${window.location.origin}/images/defaultbanner.jpeg`;
                                }}
                            />
                            
                            <div className="mt-12">
                                <h2>{title}</h2>

                                <div className="flex max-sm:flex-col justify-between my-8">
                                    <div className="flex gap-5 items-start">
                                        <img src={profile_img} className="w-12 h-12 rounded-full" />

                                        <p className="capitalize">
                                            {fullname}
                                            <br />
                                            @
                                            <Link to={`/user/${author_username}`} className="underline">{author_username}</Link>
                                        </p>
                                        
                                    </div>
                                    <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">Published on {getDay(publishedAt)}</p>
                                </div>
                            </div>

                            {content && content[0] && content[0].blocks && (
                                <div className="my-12 font-gelasio blog-page-content">
                                    {content[0].blocks.map((block, i) => (
                                        <div key={i} className="my-4 md:my-8">
                                            <BlogContent block={block} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <BlogInteraction />
                            
                            {/* 관련 블로그 섹션 위에 광고 배치 - 충분한 콘텐츠가 있을 때만 광고 표시 */}
                            {similarBlogs != null && similarBlogs.length > 1 && (
                                <AdSense 
                                  adSlot="3539444270" 
                                  adFormat="fluid"
                                  style={{ margin: '30px 0' }}
                                />
                            )}
                            
                            {
                                similarBlogs != null && similarBlogs.length ?
                                <>
                                    <h1 className="text-2xl mt-12 mb-8 font-medium">Similar Blogs</h1>
                                    <div className="flex gap-5 flex-wrap">
                                        {
                                            similarBlogs.map((blog, i) => {
                                                return <BlogPostCard content={blog} author={blog.author.personal_info} key={i} />
                                            })
                                        }
                                    </div>
                                </> : ""
                            }

                        </div>
                    </BlogContext.Provider>
                }
            </AnimationWrapper>
        </>
    )
}

export default BlogPage;