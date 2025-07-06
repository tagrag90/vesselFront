import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { getDay } from "../common/date";
import defaultBanner from "../imgs/defaultbanner.jpeg";

const HeroBanner = ({ featuredBlogs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState(null);

    if (!featuredBlogs || featuredBlogs.length === 0) {
        return null;
    }

    return (
        <div className="w-full px-4 lg:px-8">
            <div className="max-w-7xl mx-auto relative overflow-hidden rounded-lg lg:rounded-xl">
                <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                modules={[Autoplay, Navigation, EffectFade]}
                className="hero-swiper w-full"
                onSwiper={setSwiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {featuredBlogs.slice(0, 5).map((blog, index) => {
                    const { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = blog;
                    const { fullname, profile_img, username } = blog.author.personal_info;
                    
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full flex flex-col">
                                {/* 배경 이미지 */}
                                <div className="h-[40vh] md:h-[45vh] lg:h-[50vh] relative">
                                    <img 
                                        src={banner || defaultBanner} 
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                {/* 콘텐츠 - 하단 중앙 */}
                                <div className="py-8 px-6">
                                    <div className="max-w-4xl mx-auto text-center">
                                        {/* 태그 */}
                                        <div className="mb-4">
                                            <span className="inline-block px-4 py-2 bg-white rounded-full text-black text-sm font-medium border border-gray-300">
                                                {tags[0]}
                                            </span>
                                        </div>
                                        
                                        {/* 제목 */}
                                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-4 leading-tight">
                                            {title}
                                        </h1>
                                        
                                        {/* 설명 */}
                                        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed line-clamp-2 max-w-2xl mx-auto">
                                            {des}
                                        </p>
                                        
                                        {/* 작성자 정보 및 액션 */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-4">
                                            <div className="flex items-center gap-3 justify-center">
                                                <img 
                                                    src={profile_img} 
                                                    alt={fullname}
                                                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                                                />
                                                <div className="text-center sm:text-left">
                                                    <p className="text-black font-medium text-sm">{fullname}</p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 justify-center sm:justify-start">
                                                        <span>{getDay(publishedAt)}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <i className="fi fi-rr-heart"></i>
                                                            {total_likes}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Link 
                                            to={`/blog/${id}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                                        >
                                            <span>Read Article</span>
                                            <i className="fi fi-rr-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                </Swiper>
                
                <style jsx>{`
                .hero-swiper .swiper-button-next,
                .hero-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(0, 0, 0, 0.3);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    backdrop-filter: blur(4px);
                    transition: all 0.3s ease;
                }
                .hero-swiper .swiper-button-next:hover,
                .hero-swiper .swiper-button-prev:hover {
                    background: rgba(0, 0, 0, 0.5);
                    transform: scale(1.1);
                }
                .hero-swiper .swiper-button-next:after,
                .hero-swiper .swiper-button-prev:after {
                    font-size: 18px;
                }
                
                @media (max-width: 768px) {
                    .hero-swiper .swiper-button-next,
                    .hero-swiper .swiper-button-prev {
                        width: 40px;
                        height: 40px;
                    }
                    .hero-swiper .swiper-button-next:after,
                    .hero-swiper .swiper-button-prev:after {
                        font-size: 14px;
                    }
                }
            `}</style>
            </div>
            
            {/* 커스텀 인디케이터 - 텍스트 박스 밖 하단 */}
            <div className="flex justify-center mt-6">
                <div className="flex items-center gap-3">
                    {featuredBlogs.slice(0, 5).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => swiperRef?.slideTo(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                                index === activeIndex 
                                    ? 'w-8 bg-black' 
                                    : 'w-3 bg-black/30 hover:bg-black/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroBanner; 