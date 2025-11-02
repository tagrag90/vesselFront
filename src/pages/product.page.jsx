import React, { useEffect } from 'react';
import AnimationWrapper from "../common/page-animation";
import { Helmet } from 'react-helmet-async';
import bLogo from "../imgs/b-logo.png";
import fullLogo from "../imgs/full-logo.png";
import logoDark from "../imgs/logo-dark.png";
import logoLight from "../imgs/logo-light.png";
import badaLogoButton from "../imgs/bada-logo-button.png";
import defaultBanner from "../imgs/defaultbanner.jpeg";

const ProductPage = () => {
    // 페이지 로드 시 스크롤 상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 제품 데이터
    const products = [
        {
            id: 1,
            name: "Dive to Bada",
            description: "대중문화예술과 함께하는 플랫폼",
            image: badaLogoButton,
            tag: "플랫폼",
            features: [
                "온라인 커뮤니티 제공",
                "K-문화 소식 및 트렌드",
                "팬덤 활동 지원"
            ],
            url: "https://divetobada.com"
        },
        {
            id: 2,
            name: "Bada Studio",
            description: "콘텐츠 제작 및 크리에이티브 스튜디오",
            image: logoDark,
            tag: "스튜디오",
            features: [
                "디지털 콘텐츠 제작",
                "팬덤 문화 연구",
                "브랜드 콜라보레이션"
            ],
            url: "#"
        },
        {
            id: 3,
            name: "Bada Archive",
            description: "K-문화와 팬덤 역사의 디지털 아카이브",
            image: logoLight,
            tag: "아카이브",
            features: [
                "역사적 자료 보존",
                "인터랙티브 타임라인",
                "지식 공유 플랫폼"
            ],
            url: "#"
        }
    ];

    return (
        <AnimationWrapper>
            <Helmet>
                <title>제품 소개 | Vessel</title>
                <meta name="description" content="Vessel의 다양한 제품과 서비스를 소개합니다." />
            </Helmet>

            {/* 히어로 섹션 */}
            <div className="bg-black text-white">
                <div className="container mx-auto px-4 py-20 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Products</h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            대중문화예술과 함께하는 혁신적인 제품과 서비스
                        </p>
                    </div>
                </div>
            </div>

            {/* 제품 리스트 섹션 */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <a 
                                key={product.id} 
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-lg overflow-hidden border border-black h-full"
                            >
                                {/* 배너 이미지 */}
                                <div className="w-full aspect-video">
                                    <img 
                                        src={product.image || defaultBanner} 
                                        className="w-full h-full object-cover rounded-t-lg" 
                                        alt={product.name}
                                    />
                                </div>
                                
                                {/* 텍스트 콘텐츠 - 수직으로 배치 */}
                                <div className="p-5 bg-white">
                                    {/* 태그 */}
                                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-white text-black border border-black mb-3">
                                        {product.tag}
                                    </span>
                                    
                                    {/* 제목 */}
                                    <h1 className="blog-title text-black mb-3">{product.name}</h1>
                                    
                                    {/* 설명 (선택적으로 표시) */}
                                    <p className="text-gray-600 line-clamp-2 mb-3 max-sm:hidden">{product.description}</p>
                                    
                                    {/* 기능 목록 (블로그 카드의 작성자 정보 위치에 추가) */}
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <ul className="text-gray-600 space-y-1">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="text-sm flex items-start">
                                                    <span className="mr-2">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* 스토리 섹션 */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">우리의 이야기</h2>
                            <p className="text-gray-600 mb-6 text-lg">
                                Vessel은 대중문화예술과 팬덤 문화에 대한 깊은 이해를 바탕으로 새로운 가치를 창출합니다. 우리는 디지털 시대에 맞는 혁신적인 서비스로 문화의 흐름을 이끌어갑니다.
                            </p>
                            <p className="text-gray-600 text-lg">
                                국내외 다양한 파트너와 함께 K-문화의 가치를 높이고, 팬과 아티스트가 더 가깝게 소통할 수 있는 플랫폼을 구축하고 있습니다.
                            </p>
                        </div>
                        <div className="bg-black rounded-2xl p-10 text-white">
                            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✦</span>
                                    <p>글로벌 문화 교류의 중심</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✦</span>
                                    <p>혁신적인 팬덤 경험 제공</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✦</span>
                                    <p>디지털 문화유산 보존</p>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-2xl mr-3">✦</span>
                                    <p>콘텐츠 산업의 새로운 패러다임 구축</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="bg-black text-white py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">함께 문화를 만들어가요</h2>
                    <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
                        우리는 대중문화예술의 가치를 높이고, 더 많은 사람들이 즐길 수 있는 플랫폼을 만들어갑니다.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a
                            href="mailto:teambada1206@gmail.com"
                            className="inline-block bg-white text-black py-3 px-8 rounded-full font-medium hover:bg-gray-200 transition-colors"
                        >
                            문의하기
                        </a>
                        <a
                            href="#"
                            className="inline-block border border-white text-white py-3 px-8 rounded-full font-medium hover:bg-white/10 transition-colors"
                        >
                            자세히 알아보기
                        </a>
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default ProductPage; 