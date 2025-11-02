import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import { useLocation, Link } from "react-router-dom";
import HeroBanner from "../components/hero-banner.component";
import MagazineBlogCard from "../components/magazine-blog-card.component";

const HomePage = () => {
    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
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
        
    }, [pageState, location.search]);

    return (
        <AnimationWrapper>
            <section className="h-cover" style={{ padding: 0 }}>
                <div className="w-full" style={{ paddingLeft: '5vw', paddingRight: '5vw', paddingTop: '2rem', paddingBottom: '2rem' }}>
                    {/* 히어로 배너 - 전체 너비 */}
                    {blogs == null ? (
                        <div className="mb-12">
                            <Loader />
                        </div>
                    ) : blogs.results && blogs.results.length > 0 ? (
                        <div className="mb-12">
                            {/* 히어로 배너 컴포넌트 - 좌우 꽉 체움 */}
                            <div className="mb-12" style={{ marginLeft: '-5vw', marginRight: '-5vw', width: 'calc(100% + 10vw)' }}>
                                <HeroBanner 
                                    featuredBlogs={blogs.results.slice(0, 5)} 
                                    buttonColor="black"
                                    useFade={false}
                                />
                            </div>
                            
                            {/* 최근 콘텐츠 - 최신순 6개 */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">최근 콘텐츠</h2>
                                <Link 
                                    to="/content"
                                    className="text-black hover:text-black/70 transition-colors font-medium"
                                >
                                    더 보기 →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {blogs.results.slice(0, 6).map((blog, i) => (
                                    <AnimationWrapper
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        key={blog.blog_id || i}
                                    >
                                        <MagazineBlogCard
                                            content={blog}
                                            author={blog.author?.personal_info}
                                            index={i}
                                        />
                                    </AnimationWrapper>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mb-12">
                            <NoDataMessage message="No blogs published" />
                        </div>
                    )}
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
