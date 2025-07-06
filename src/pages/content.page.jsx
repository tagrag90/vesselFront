import React, { useEffect, useState } from 'react';
import AnimationWrapper from "../common/page-animation";
import { Helmet } from 'react-helmet-async';
import MarqueeBanner from "../components/marquee-banner.component";
import bLogo from "../imgs/b-logo.png";
import axios from "axios";
import MagazineBlogCard from "../components/magazine-blog-card.component";
import NoDataMessage from "../components/nodata.component";
import Loader from "../components/loader.component";

const ContentPage = () => {
    let [blogs, setBlog] = useState(null);

    // 페이지 로드 시 스크롤 상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchAllBlogs = async () => {
        try {
            // 먼저 전체 블로그 수 확인
            const countResponse = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/all-latest-blogs-count");
            const totalBlogs = countResponse.data.totalDocs;
            
            // 페이지당 기본 아이템 수 (보통 5개)
            const itemsPerPage = 5;
            const totalPages = Math.ceil(totalBlogs / itemsPerPage);
            
            // 모든 페이지의 데이터를 병렬로 가져오기
            const pagePromises = [];
            for (let page = 1; page <= totalPages; page++) {
                pagePromises.push(
                    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
                );
            }
            
            const allResponses = await Promise.all(pagePromises);
            
            // 모든 블로그 데이터를 하나의 배열로 합치기
            const allBlogs = [];
            allResponses.forEach(response => {
                if (response.data.blogs && response.data.blogs.length > 0) {
                    allBlogs.push(...response.data.blogs);
                }
            });
            
            setBlog(allBlogs);
            
        } catch (err) {
            console.log("Error fetching all blogs:", err);
            // 에러 발생시 기본적으로 첫 페이지라도 가져오기
            try {
                const response = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page: 1 });
                setBlog(response.data.blogs || []);
            } catch (fallbackErr) {
                console.log("Fallback also failed:", fallbackErr);
                setBlog([]);
            }
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    return (
        <AnimationWrapper>
            <Helmet>
                <title>콘텐츠 | Vessel</title>
                <meta name="description" content="Vessel의 다양한 콘텐츠를 만나보세요." />
            </Helmet>

            {/* 마퀴 배너 */}
            <MarqueeBanner 
                text="Let's Divtobada 🌊" 
                altText="We create Community and solution for K-culture 👊" 
                bgColor="#000000" 
                textColor="#ffffff" 
                imageSrc={bLogo} 
            />

            {/* 히어로 섹션 */}
            <div style={{backgroundColor: "#000000"}} className="text-white">
                <div className="container mx-auto px-4 py-20 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Contents</h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            대중문화예술에 관한 다양한 콘텐츠를 만나보세요
                        </p>
                    </div>
                </div>
            </div>

            {/* 블로그 아티클 섹션 */}
            <section style={{backgroundColor: "#000000"}} className="py-16 md:py-24 text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    {blogs == null ? (
                        <Loader />
                    ) : (
                        blogs.length ? 
                            <div className="space-y-6">
                                {blogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper
                                            transition={{
                                                duration: 1,
                                                delay: i * 0.1,
                                            }}
                                            key={i}
                                        >
                                            <MagazineBlogCard
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
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default ContentPage; 