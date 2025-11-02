import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { getDay } from "../common/date";
import defaultBanner from "../imgs/defaultbanner.jpeg";

// 랜덤 배경색 팔레트
const backgroundColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#82E0AA',
    '#F1948A', '#85C1E9', '#AED6F1', '#F9E79F', '#A3E4D7'
];

// 블로그 ID를 기반으로 랜덤 색상 선택
const getRandomColor = (id, index) => {
    if (!id) return backgroundColors[index % backgroundColors.length];
    // ID의 문자열 값을 숫자로 변환하여 색상 선택
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return backgroundColors[Math.abs(hash) % backgroundColors.length];
};

const HeroBanner = ({ featuredBlogs, buttonColor = 'green', useFade = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState(null);

    // 디버깅: featuredBlogs 확인
    console.log('HeroBanner - featuredBlogs:', featuredBlogs);
    
    if (!featuredBlogs || featuredBlogs.length === 0) {
        console.log('HeroBanner - No featured blogs, returning null');
        return null;
    }

    return (
        <div className="w-full rounded-none">
            <div className="relative overflow-hidden rounded-none">
                <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                effect={useFade ? "fade" : undefined}
                fadeEffect={useFade ? { crossFade: true } : undefined}
                pagination={false}
                modules={useFade ? [Autoplay, Navigation, EffectFade] : [Autoplay, Navigation]}
                className="hero-swiper w-full"
                onSwiper={setSwiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {featuredBlogs.slice(0, 5).map((blog, index) => {
                    const { publishedAt, tags, title, des, banner, activity = {}, blog_id: id } = blog;
                    const { total_likes = 0 } = activity;
                    const authorInfo = blog.author?.personal_info || {};
                    const { fullname = '', profile_img = '', username = '' } = authorInfo;
                    
                    const bgColor = getRandomColor(id, index);
                    
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full relative min-h-[60vh] md:min-h-[70vh] overflow-hidden rounded-none">
                                {/* 배경 이미지 또는 랜덤 배경색 */}
                                {banner && banner.trim() ? (
                                    <div className="absolute inset-0">
                                        <img 
                                            src={banner} 
                                            alt={title || '논타이틀'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div 
                                        className="absolute inset-0"
                                        style={{
                                            backgroundColor: bgColor
                                        }}
                                    />
                                )}
                                
                                {/* 그라데이션 오버레이 - 배너가 있을 때만 표시 */}
                                {banner && banner.trim() && (
                                    <div 
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)'
                                        }}
                                    />
                                )}
                                
                                {/* 콘텐츠 - 하단 좌측 */}
                                <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-16">
                                    <div className="flex flex-col justify-end items-start max-w-4xl">
                                        {/* 태그 - 좌측 정렬 */}
                                        {tags && tags[0] && (
                                            <div className="mb-4">
                                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#00DD89] text-black font-normal">
                                                    {tags[0]}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* 제목 - 좌측 정렬 */}
                                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-left ${banner && banner.trim() ? 'text-white' : 'text-black'}`}>
                                            {title || '논타이틀'}
                                        </h1>
                                        
                                        {/* 설명 - 좌측 정렬 */}
                                        {des && (
                                            <p className={`text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed line-clamp-2 max-w-2xl text-left ${banner && banner.trim() ? 'text-white/90' : 'text-dark-grey'}`}>
                                                {des}
                                            </p>
                                        )}
                                        
                                        {/* 작성자 정보 - 좌측 정렬 */}
                                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                                            {profile_img && (
                                                <img 
                                                    src={profile_img} 
                                                    alt={fullname}
                                                    className={`w-12 h-12 rounded-full border-2 ${banner && banner.trim() ? 'border-white/50' : 'border-black/30'}`}
                                                />
                                            )}
                                            <div>
                                                {fullname && (
                                                    <p className={`font-medium text-sm md:text-base ${banner && banner.trim() ? 'text-white' : 'text-black'}`}>{fullname}</p>
                                                )}
                                                <div className={`flex items-center gap-2 text-sm md:text-base ${banner && banner.trim() ? 'text-white/80' : 'text-dark-grey'}`}>
                                                    <span>{getDay(publishedAt)}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <i className="fi fi-rr-heart"></i>
                                                        {total_likes || 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* 버튼 - 오른쪽 하단 */}
                                <div className="absolute bottom-6 md:bottom-12 lg:bottom-16 right-6 md:right-12 lg:right-16 z-20">
                                    <Link 
                                        to={`/blog/${id}`}
                                        className={`inline-flex items-center gap-2 px-8 py-4 font-medium rounded-full transition-all duration-200 text-base md:text-lg ${
                                            buttonColor === 'black' 
                                                ? 'bg-black text-white hover:bg-black/90' 
                                                : 'bg-[#00DD89] text-black hover:bg-[#00DD89]/90 shadow-lg'
                                        }`}
                                    >
                                        <span>자세히 보기</span>
                                        <i className="fi fi-rr-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                </Swiper>
                
                {/* 하단 네비게이터 - 히어로 내부 오버레이 (단일 인스턴스) */}
                <div className="absolute bottom-4 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex items-center gap-3 px-4 py-2 backdrop-blur-md bg-black/30">
                        {featuredBlogs.slice(0, 5).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => swiperRef?.slideTo(idx)}
                                className={`transition-all duration-300 ${
                                    activeIndex === idx 
                                        ? 'w-10 h-3 bg-white shadow-lg border border-white/50' 
                                        : 'w-3 h-3 bg-white/70 hover:bg-white'
                                }`}
                                aria-label={`슬라이드 ${idx + 1}로 이동`}
                            />
                        ))}
                    </div>
                </div>
                
                <style jsx>{`
                .hero-swiper {
                    padding-bottom: ${useFade ? '0' : '0'};
                }
                .hero-swiper .swiper-button-next,
                .hero-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(255, 255, 255, 0.2);
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    backdrop-filter: blur(8px);
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .hero-swiper .swiper-button-next:hover,
                .hero-swiper .swiper-button-prev:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.05);
                    border-color: rgba(255, 255, 255, 0.5);
                }
                .hero-swiper .swiper-button-next:after,
                .hero-swiper .swiper-button-prev:after {
                    font-size: 20px;
                    font-weight: 700;
                }
                .hero-swiper .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.4;
                }
                .hero-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    background: white;
                }
                
                @media (max-width: 768px) {
                    .hero-swiper .swiper-button-next,
                    .hero-swiper .swiper-button-prev {
                        width: 44px;
                        height: 44px;
                    }
                    .hero-swiper .swiper-button-next:after,
                    .hero-swiper .swiper-button-prev:after {
                        font-size: 16px;
                    }
                }
            `}</style>
            </div>
        </div>
    );
};

export default HeroBanner; 