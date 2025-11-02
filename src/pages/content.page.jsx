import React, { useEffect, useState } from 'react';
import AnimationWrapper from "../common/page-animation";
import { Helmet } from 'react-helmet-async';
import bLogo from "../imgs/b-logo.png";
import axios from "axios";
import MagazineBlogCard from "../components/magazine-blog-card.component";
import NoDataMessage from "../components/nodata.component";
import Loader from "../components/loader.component";

const ContentPage = () => {
    let [blogs, setBlog] = useState(null);
    let [columnCount, setColumnCount] = useState(2);
    let [columnBlogs, setColumnBlogs] = useState([]);

    // 페이지 로드 시 스크롤 상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 화면 크기에 따라 칼럼 수 결정
    useEffect(() => {
        const updateColumnCount = () => {
            const width = window.innerWidth;
            if (width >= 1920) {
                setColumnCount(4); // 초대형 화면: 4칼럼
            } else if (width >= 1536) {
                setColumnCount(3); // 대형 화면: 3칼럼
            } else if (width >= 1024) {
                setColumnCount(2); // 중형 화면: 2칼럼
            } else {
                setColumnCount(1); // 모바일: 1칼럼
            }
        };

        updateColumnCount();
        window.addEventListener('resize', updateColumnCount);
        return () => window.removeEventListener('resize', updateColumnCount);
    }, []);

    // 블로그를 칼럼 수에 맞게 배분
    useEffect(() => {
        if (blogs && blogs.length > 0 && columnCount > 0) {
            const columns = Array.from({ length: columnCount }, () => []);
            
            blogs.forEach((blog, i) => {
                const columnIndex = i % columnCount;
                columns[columnIndex].push(blog);
            });
            
            setColumnBlogs(columns);
        }
    }, [blogs, columnCount]);

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

            {/* 히어로 섹션 */}
            <div className="bg-black text-white">
                <div className="container mx-auto px-4 py-20 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-6">Our Contents</h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            대중문화예술에 관한 다양한 콘텐츠를 만나보세요
                        </p>
                    </div>
                </div>
            </div>

            {/* 블로그 아티클 섹션 - 핀터레스트 스타일 그리드 */}
            <section className="bg-white py-16 md:py-24">
                <div className="px-4 md:px-6 lg:px-8" style={{ maxWidth: '100%', width: '100%' }}>
                    {blogs == null ? (
                        <Loader />
                    ) : (
                        blogs.length ? 
                            <div 
                                className="grid gap-6"
                                style={{ 
                                    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                                    alignItems: 'start'
                                }}
                            >
                                {columnBlogs.map((columnBlogs, columnIndex) => (
                                    <div 
                                        key={columnIndex}
                                        style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            gap: '24px' 
                                        }}
                                    >
                                        {columnBlogs.map((blog, i) => {
                                            const originalIndex = blogs.findIndex(b => b.blog_id === blog.blog_id);
                                            return (
                                                <div
                                                    key={blog.blog_id || `col-${columnIndex}-${i}`}
                                                    style={{
                                                        width: '100%'
                                                    }}
                                                >
                                                    <AnimationWrapper
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: (originalIndex % 8) * 0.05,
                                                        }}
                                                        keyValue={blog.blog_id || `col-${columnIndex}-${i}`}
                                                    >
                                                        <MagazineBlogCard
                                                            content={blog}
                                                            author={blog.author?.personal_info}
                                                            index={originalIndex}
                                                        />
                                                    </AnimationWrapper>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        : <NoDataMessage message="No blogs published" />
                    )}
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default ContentPage; 