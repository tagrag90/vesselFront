import React, { useEffect, useState } from 'react';
import AnimationWrapper from "../common/page-animation";
import { Helmet } from 'react-helmet-async';
import MarqueeBanner from "../components/marquee-banner.component";
import bLogo from "../imgs/b-logo.png";

const ContentPage = () => {
    // 페이지 로드 시 스크롤 상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 현재 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState('videos');

    // 유튜브 영상 데이터
    const youtubeVideos = [
        {
            id: 1,
            title: "Studio_bada 소개영상",
            videoId: "0dQ3Q3OaNco", // 스튜디오 바다 소개 영상
            description: "Studio_bada의 활동과 비전을 소개합니다",
            category: "소개"
        },
        {
            id: 2,
            title: "팬덤 문화의 역사",
            videoId: "dQw4w9WgXcQ", // 예시 비디오 ID
            description: "K-pop 팬덤 문화의 역사와 발전 과정을 설명합니다",
            category: "문화"
        },
        {
            id: 3,
            title: "콘텐츠 기획 프로세스",
            videoId: "dQw4w9WgXcQ", // 예시 비디오 ID
            description: "대중문화 콘텐츠 기획의 전 과정을 알아봅니다",
            category: "기획"
        }
    ];

    // PDF 파일 데이터
    const pdfFiles = [
        {
            id: 1,
            title: "2023 팬덤 문화 보고서",
            filename: "fandom-culture-report-2023.pdf",
            thumbnail: "/path/to/thumbnail1.jpg", // 실제 썸네일 이미지로 교체 필요
            description: "2023년 K-pop 팬덤 문화 트렌드와 분석 보고서",
            category: "보고서",
            uploadDate: "2023-12-15"
        },
        {
            id: 2,
            title: "대중문화 산업 전망",
            filename: "pop-culture-industry-forecast.pdf",
            thumbnail: "/path/to/thumbnail2.jpg", // 실제 썸네일 이미지로 교체 필요
            description: "미래 대중문화 산업의 전망과 발전 방향성 제시",
            category: "연구",
            uploadDate: "2023-11-20"
        },
        {
            id: 3,
            title: "크리에이터 가이드북",
            filename: "creator-guidebook.pdf",
            thumbnail: "/path/to/thumbnail3.jpg", // 실제 썸네일 이미지로 교체 필요
            description: "콘텐츠 크리에이터를 위한 실용적인 가이드와 팁",
            category: "가이드북",
            uploadDate: "2023-10-05"
        }
    ];

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

            {/* 콘텐츠 탭 네비게이션 */}
            <div style={{backgroundColor: "#000000"}} className="border-b border-gray-800">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex">
                        <button 
                            className={`py-4 px-6 font-medium text-lg ${activeTab === 'videos' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('videos')}
                        >
                            영상 콘텐츠
                        </button>
                        <button 
                            className={`py-4 px-6 font-medium text-lg ${activeTab === 'pdfs' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('pdfs')}
                        >
                            문서 자료
                        </button>
                    </div>
                </div>
            </div>

            {/* 콘텐츠 섹션 - 유튜브 영상 */}
            {activeTab === 'videos' && (
                <section style={{backgroundColor: "#000000"}} className="py-16 md:py-24 text-white">
                    <div className="container mx-auto px-4 max-w-6xl">
                        {/* 카테고리 필터 */}
                        <div className="flex flex-wrap gap-4 mb-12 justify-center">
                            <button className="px-6 py-2 rounded-full bg-white text-black">전체</button>
                            <button className="px-6 py-2 rounded-full border border-white text-white">소개</button>
                            <button className="px-6 py-2 rounded-full border border-white text-white">문화</button>
                            <button className="px-6 py-2 rounded-full border border-white text-white">기획</button>
                        </div>
                        
                        {/* 유튜브 영상 그리드 */}
                        <div className="space-y-8">
                            {youtubeVideos.map((video) => (
                                <div key={video.id} style={{backgroundColor: "#0f0f0f"}} className="rounded-lg overflow-hidden border border-gray-800">
                                    <div className="flex flex-col">
                                        {/* 유튜브 임베드 */}
                                        <div className="aspect-video">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        
                                        {/* 영상 정보 */}
                                        <div className="p-5">
                                            <span style={{backgroundColor: "#000000"}} className="inline-block px-3 py-1 rounded-full text-sm text-white border border-white mb-3">
                                                {video.category}
                                            </span>
                                            <h2 className="text-2xl font-bold mb-3 text-white">{video.title}</h2>
                                            <p className="text-gray-300">{video.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 콘텐츠 섹션 - PDF 파일 */}
            {activeTab === 'pdfs' && (
                <section style={{backgroundColor: "#000000"}} className="py-16 md:py-24 text-white">
                    <div className="container mx-auto px-4 max-w-6xl">
                        {/* 카테고리 필터 */}
                        <div className="flex flex-wrap gap-4 mb-12 justify-center">
                            <button className="px-6 py-2 rounded-full bg-white text-black">전체</button>
                            <button className="px-6 py-2 rounded-full border border-white text-white">보고서</button>
                            <button className="px-6 py-2 rounded-full border border-white text-white">연구</button>
                            <button className="px-6 py-2 rounded-full border border-white text-white">가이드북</button>
                        </div>
                        
                        {/* PDF 파일 목록 - 수평 배열 */}
                        <div className="space-y-4">
                            {pdfFiles.map((pdf) => (
                                <div key={pdf.id} style={{backgroundColor: "#0f0f0f"}} className="rounded-lg overflow-hidden border border-gray-800 p-5 flex items-center">
                                    {/* PDF 정보 */}
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span style={{backgroundColor: "#000000"}} className="inline-block px-3 py-1 rounded-full text-sm text-white border border-white">
                                                {pdf.category}
                                            </span>
                                            <span className="text-sm text-gray-300">{pdf.uploadDate}</span>
                                        </div>
                                        <h2 className="text-xl font-bold mb-1 text-white">{pdf.title}</h2>
                                        <p className="text-gray-300">{pdf.description}</p>
                                    </div>
                                    <a 
                                        href={`/pdfs/${pdf.filename}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="flex-shrink-0 ml-4 bg-white text-black py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-200"
                                    >
                                        문서 보기
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </AnimationWrapper>
    );
};

export default ContentPage; 