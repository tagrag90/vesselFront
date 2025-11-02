import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay, getFormattedDate } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer, { fetchComments } from "../components/comments.component";
import { Helmet } from 'react-helmet-async';

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

    let { 
        title = '', 
        des = '', 
        content = [], 
        banner = '', 
        tags = [], 
        author = { personal_info: {} }, 
        publishedAt = '' 
    } = blog;
    
    let { personal_info: { fullname = '', username: author_username = '', profile_img = '' } = {} } = author || {};

    const fetchBlog = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
        .then(async ({ data: { blog } }) => {

            blog.comments = await fetchComments({ blog_id: blog._id, setParentCommentCountFun: setTotalParentCommentsLoaded })
            setBlog(blog)

            if (blog.tags && blog.tags.length > 0) {
                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: blog.tags[0], limit: 6, eliminate_blog: blog_id })
                .then(({ data }) => {
                    setSimilrBlogs(data.blogs);
                })
                .catch(err => {
                    console.log(err);
                })
            }

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
                            {/* 배너 이미지 - 배너가 있을 때만 표시 */}
                            {banner && banner.trim() && (
                                <div className="max-lg:-mx-[5vw] max-lg:w-screen">
                                    <img 
                                        src={getFullImageUrl(banner)} 
                                        className="aspect-video w-full object-cover max-lg:rounded-none rounded-[20px]"
                                        alt={title || 'Blog banner'}
                                        onError={(e) => {
                                            console.error('Image load error:', e);
                                            e.target.src = `${window.location.origin}/images/defaultbanner.jpeg`;
                                        }}
                                    />
                                </div>
                            )}
                            
                            <div className={banner && banner.trim() ? "mt-12" : ""}>
                                {/* 날짜 및 태그 */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {tags && tags.length > 0 && tags.map((tag, i) => (
                                            <span key={i} className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#00DD89] text-black font-normal">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    {publishedAt && (
                                        <p className="text-sm text-dark-grey">
                                            {getFormattedDate(publishedAt)}
                                        </p>
                                    )}
                                </div>

                                {/* 제목 */}
                                <h1 className="text-5xl font-bold leading-tight mb-8">{title || '논타이틀'}</h1>

                                {/* 작성자 정보 (간소화) */}
                                {fullname && (
                                    <div className="flex items-center gap-3 mb-12 pb-8 border-b border-black/10">
                                        {profile_img && (
                                            <img src={profile_img} className="w-10 h-10 rounded-full" alt={fullname} />
                                        )}
                                        <div>
                                            <p className="font-medium text-black">{fullname}</p>
                                            {author_username && (
                                                <Link to={`/user/${author_username}`} className="text-sm text-dark-grey hover:text-purple">
                                                    @{author_username}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 본문 영역 (더 좁은 폭) */}
                            {content && content[0] && content[0].blocks && (
                                <div className="max-w-[700px] mx-auto my-16 font-gelasio blog-page-content">
                                    {content[0].blocks.map((block, i) => (
                                        <div key={i} className="my-6 md:my-8">
                                            <BlogContent block={block} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* 인터랙션 바 (중앙 정렬) */}
                            <div className="max-w-[700px] mx-auto">
                                <BlogInteraction />
                            </div>
                            
                            {/* 관련 블로그 섹션 */}
                            {similarBlogs != null && similarBlogs.length > 0 && (
                                <section className="mt-16 md:mt-20 lg:mt-24">
                                    <div className="max-w-[900px] mx-auto">
                                        <h2 className="text-4xl font-bold mb-8">Related Articles</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {similarBlogs.map((blog, i) => {
                                                return (
                                                    <BlogPostCard 
                                                        content={blog} 
                                                        author={blog.author?.personal_info || {}} 
                                                        key={blog.blog_id || i} 
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            )}

                        </div>
                    </BlogContext.Provider>
                }
            </AnimationWrapper>
        </>
    )
}

export default BlogPage;