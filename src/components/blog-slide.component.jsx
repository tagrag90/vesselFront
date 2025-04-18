/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import defaultBanner from "../imgs/defaultbanner.jpeg";

const BlogSlideCard = ({ featuredBlogs = [] }) => {
    // 화면 크기 상태 관리
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const slidesPerView = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;
    
    return (
        <div className="w-full mb-12">
            <Swiper
                spaceBetween={20}
                slidesPerView={slidesPerView}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {featuredBlogs.map((blog, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/blog/${blog.blog_id}`} className="block rounded-lg overflow-hidden">
                            <div className="relative w-full aspect-video">
                                {/* 배너 이미지 */}
                                <img 
                                    src={blog.banner || defaultBanner} 
                                    className="w-full h-full object-cover" 
                                    alt={blog.title}
                                />
                                
                                {/* 그라데이션 오버레이 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                                
                                {/* 텍스트 콘텐츠 */}
                                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                    {/* 태그 */}
                                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-white text-black border border-black mb-3">
                                        {blog.tags && blog.tags[0]}
                                    </span>
                                    
                                    {/* 제목 */}
                                    <h1 className="blog-title text-white mb-3">{blog.title}</h1>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <style jsx>{`
                .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.7;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1;
                    background: white;
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default BlogSlideCard; 