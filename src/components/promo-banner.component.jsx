import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
    // 배너 데이터
    const bannerData = [
        {
            id: 1,
            title: "Over the 1nch",
            subtitle: "우리는 대중문화예술의 해결사가 되고자 합니다",
            description: "우리가 사랑하는 것들이 여전히 우리 곁에 있을 수 있도록, 어쩌면 1인치도 안 되는 우리들과 대중문화예술 사이에 장벽을 없애는 일을 합니다. 우리 방식으로요!",
            ctaText: "자세히 보기",
            linkUrl: "/promo/pets",
            bgColor: "#f5f5f7",
            textColor: "#000000"
        }
    ];

    return (
        <div className="w-full mb-12 overflow-hidden">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="promo-swiper lg:rounded-xl"
            >
                {bannerData.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div 
                            className="flex flex-col justify-center items-center px-8 py-24 md:px-16 md:py-32 h-[400px] md:h-[500px] w-full"
                            style={{ backgroundColor: banner.bgColor, color: banner.textColor }}
                        >
                            <div className="max-w-2xl text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">{banner.title}</h2>
                                <h3 className="text-xl md:text-2xl font-bold mb-4">{banner.subtitle}</h3>
                                <p className="text-base md:text-lg mb-6 opacity-80">{banner.description}</p>
                                <Link to={banner.linkUrl} className="inline-block px-5 py-2 bg-black text-white rounded-full font-medium hover:bg-opacity-80">
                                    {banner.ctaText}
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <style jsx>{`
                .promo-swiper .swiper-pagination-bullet {
                    background: #000;
                    opacity: 0.3;
                }
                .promo-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    background: #000;
                }
                .promo-swiper .swiper-button-next,
                .promo-swiper .swiper-button-prev {
                    color: #000;
                }
            `}</style>
        </div>
    );
};

export default PromoBanner; 