import React, { useEffect } from 'react';
import AnimationWrapper from "../common/page-animation";
import { Helmet } from 'react-helmet-async';
import MarqueeBanner from "../components/marquee-banner.component";
import bLogo from "../imgs/b-logo.png";

const AboutPage = () => {
    // 페이지 로드 시 스크롤 상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 팀 멤버 데이터
    const teamMembers = [
        {
            id: 1,
            name: "김대표",
            role: "대표 / CEO",
            description: "대중문화예술에 대한 깊은 이해와 10년 이상의 경험을 바탕으로 Vessel을 이끌고 있습니다.",
            image: "/path/to/profile1.jpg" // 실제 이미지로 변경 필요
        },
        {
            id: 2,
            name: "이기획",
            role: "콘텐츠 기획",
            description: "창의적인 콘텐츠 기획과 프로젝트 관리를 통해 팬과 아티스트를 연결하는 새로운 방법을 모색합니다.",
            image: "/path/to/profile2.jpg" // 실제 이미지로 변경 필요
        },
        {
            id: 3,
            name: "박개발",
            role: "기술 개발",
            description: "최신 기술 트렌드를 반영한 플랫폼 개발로 사용자 경험을 극대화합니다.",
            image: "/path/to/profile3.jpg" // 실제 이미지로 변경 필요
        }
    ];

    return (
        <AnimationWrapper>
            <Helmet>
                <title>소개 | Vessel</title>
                <meta name="description" content="Studio_bada의 미션과 팀을 소개합니다." />
            </Helmet>

            {/* 마퀴 배너 */}
            <MarqueeBanner 
                text="Let's Divtobada 🌊" 
                altText="We create Community and solution for K-culture 👊" 
                bgColor="#000000" 
                textColor="#ffffff" 
                imageSrc={bLogo} 
            />

            {/* 미션 섹션 */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">MISSION</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            사람들이 온오프라인에 만나는 대중문화를 즐기기 위한 장애물을 없애는 것이다.
                            <br />그리고 그래야만 새로운 조직의 형태와 활동범위 체시하는 것이다.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                        <div className="p-6 border border-gray-800 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">문화 주권 수성</h3>
                            <p className="text-gray-300 mb-4">한국 콘텐츠를 한국 관점에서, IP 확보를 통해 글로벌 콘텐츠 소셜, 3차 파장자들 현장 수익 극대화.</p>
                        </div>
                        
                        <div className="p-6 border border-gray-800 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">새로운 일하는 방식 제시</h3>
                            <p className="text-gray-300 mb-4">트렌드, 우월한 조직의 시작점 되다. 미래형 조직구조의 대안 제시</p>
                        </div>
                        
                        <div className="p-6 border border-gray-800 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">창작 생태계 개선</h3>
                            <p className="text-gray-300 mb-4">대중문화산업의 기반이 되는 플랫폼, 크리에이터들의 성장 바우쳐 정군합의 형성과 소비자 및 팬덤의 행동양식 기술 및 경험 생계로 연결.</p>
                        </div>
                        
                        <div className="p-6 border border-gray-800 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">커뮤니티 세분화</h3>
                            <p className="text-gray-300 mb-4">정치, 주적, 혐오 등에서 벗어나 크리에이터들과 대중문화를 사랑하는 팬들을 위한 커뮤니티</p>
                        </div>
                    </div>
                    
                    <div className="mt-20 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Over the wall, just a inch.</h2>
                        <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
                            크리에이터와 스튜디오의 활동을 다양한 소셜 미디어로 공유하며 "팬과의 사용하는 새로운 조직문화를 활동하는 사람들"이라는 레퍼스너 형성
                        </p>
                    </div>
                </div>
            </section>

            {/* 팀 소개 섹션 */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Team</h2>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600">
                            대중문화예술과 함께하는 Studio_bada의 멤버들을 소개합니다
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-6"></div>
                                <h3 className="text-2xl font-bold text-center mb-2">{member.name}</h3>
                                <p className="text-gray-500 text-center mb-4">{member.role}</p>
                                <p className="text-gray-600 text-center">{member.description}</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-20 text-center">
                        <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                        <p className="text-gray-600 mb-8">
                            질문이나 제안이 있으시면 언제든지 연락해주세요.
                        </p>
                        <a
                            href="mailto:teambada1206@gmail.com"
                            className="inline-block bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            이메일 보내기
                        </a>
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default AboutPage; 