import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import { useEffect, useState, useContext } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";
import { UserContext } from "../App";
import { useLocation } from "react-router-dom";
import BlogSlideCard from "../components/blog-slide.component";
import PromoBanner from "../components/promo-banner.component";
import MarqueeBanner from "../components/marquee-banner.component";
import bLogo from "../imgs/b-logo.png";

const HomePage = () => {
    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [featuredBlogs, setFeaturedBlogs] = useState([]);
    const location = useLocation();
    
    // URL에서 카테고리 정보 가져오기
    const getPageStateFromURL = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('category') || 'home';
    };
    
    // 현재 선택된 카테고리
    let pageState = getPageStateFromURL();

    const fetchLatestBlogs = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
            .then( async ({ data }) => {

                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/all-latest-blogs-count"
                })

                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchBlogsByCategory = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState, page })
            .then( async ({ data }) => {
                
                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { tag: pageState }
                })

                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchTrendingBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        // 페이지 상태에 따라 데이터 로드
        setBlog(null);
        
        if(pageState == "home"){
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 })
        }

        if(!trendingBlogs){
            fetchTrendingBlogs();
        }
        
        // 메인 슬라이드용 피처드 블로그 가져오기
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { limit: 5 })
        .then(({ data }) => {
            setFeaturedBlogs(data.blogs);
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, [pageState, location.search]);

    return (
        <AnimationWrapper>
            {/* 마퀴 배너 */}
            <MarqueeBanner 
                text="Let's Divtobada 🌊" 
                altText="We create Community and solution for K-culture 👊" 
                bgColor="#000000" 
                textColor="#ffffff" 
                imageSrc={bLogo} 
            />
            
            {/* 프로모션 배너 섹션 - 토스뱅크 스타일 */}
            <section className="py-4 lg:px-[10vw] md:lg:px-[7vw] px-0">
                <PromoBanner />
            </section>
            
            <section className="h-cover flex justify-center gap-10">
                {/* 콘텐츠 영역 */}
                <div className="max-w-7xl w-full mx-auto">
                    {/* 섹션 타이틀 */}
                    <h2 className="text-3xl font-bold mb-2">News & Article</h2>
                    <p className="text-gray-600 mb-6">대중문화예술과 함께하고 있는 Studio_bada의 스토리를 둘러보세요</p>
                    
                    {/* 블로그 포스트 목록 */}
                    {blogs == null ? (
                        <Loader />
                    ) : (
                        blogs.results.length ? 
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.results.map((blog, i) => {
                                    return (
                                        <AnimationWrapper
                                            transition={{
                                                duration: 1,
                                                delay: i * 0.1,
                                            }}
                                            key={i}
                                        >
                                            <BlogPostCard
                                                content={blog}
                                                author={
                                                    blog.author.personal_info
                                                }
                                            />
                                        </AnimationWrapper>
                                    );
                                })}
                            </div>
                        : <NoDataMessage message="No blogs published" />
                    )}
                    
                    {/* 더 불러오기 버튼 */}
                    {blogs && blogs.results.length > 0 && (
                        <LoadMoreDataBtn 
                            state={blogs} 
                            fetchDataFun={pageState === "home" ? fetchLatestBlogs : fetchBlogsByCategory} 
                        />
                    )}
                    
                    {/* 피처드 슬라이드 카드 - 하단 배너 */}
                    {featuredBlogs.length > 0 && <BlogSlideCard featuredBlogs={featuredBlogs} />}
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
