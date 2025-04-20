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

    return (
        <AnimationWrapper>
            <Helmet>
                <title>소개 | Vessel</title>
                <meta name="description" content="Studio_bada의 미션과 프로젝트를 소개합니다." />
                <link href="https://fonts.googleapis.com/css2?family=Vibur&display=swap" rel="stylesheet" />
            </Helmet>

            {/* 마퀴 배너 */}
            <MarqueeBanner 
                text="Let's Divtobada 🌊" 
                altText="We create Community and solution for K-culture 👊" 
                bgColor="#000000" 
                textColor="#ffffff" 
                imageSrc={bLogo} 
            />

            {/* 상단 섹션: 소개와 프로덕트 */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-12">
                        <p style={{fontWeight: 300, fontSize: "18px", marginBottom: "24px"}}>Product & Project</p>
                        <div style={{marginTop: "20px"}}>
                            <h1 style={{fontFamily: "HakgyoansimByeolbichhaneul, sans-serif", margin: 0, padding: 0}}>
                                <div style={{fontSize: "8vw", lineHeight: "1", fontWeight: 300, display: "inline-block", marginRight: "15px"}}>We</div>
                                <div style={{fontSize: "8vw", lineHeight: "1", fontWeight: 700, color: "#ffffff", display: "inline-block"}}>Create</div>
                                <div style={{fontSize: "8vw", lineHeight: "1", fontWeight: 700, marginTop: "10px", display: "block", fontFamily: "'Vibur', cursive"}}>Future</div>
                                <div style={{fontSize: "8vw", lineHeight: "1", fontWeight: 700, marginTop: "10px", display: "block"}}>K-Culture</div>
                            </h1>
                        </div>
                        <p style={{marginTop: "24px", maxWidth: "560px", color: "#aaaaaa"}}>
                            대중문화예술에 관한 새로운 가치를 창출하고, 팬과 크리에이터를 연결하는 
                            혁신적인 솔루션을 제공합니다. Studio_bada는 K-Culture의 미래를 
                            함께 만들어갑니다.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8 mt-16">
                        {/* 이미지 박스 1 - 흰색 배경 */}
                        <div className="bg-white rounded-lg overflow-hidden h-[32rem] relative">
                            <div className="p-4 absolute bottom-0 text-black">
                                <h3 className="font-medium">Divetobada.com</h3>
                                <p className="text-sm text-gray-600">스튜디오 바다 공식 웹사이트</p>
                            </div>
                        </div>
                        
                        {/* 이미지 박스 2 - 검은색 배경 */}
                        <div className="bg-black rounded-lg overflow-hidden h-[32rem] relative">
                            <div className="p-4 absolute bottom-0">
                                <h3 className="font-medium">Badabit_Playlist</h3>
                                <p className="text-sm text-gray-400">음악 큐레이션 서비스</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 중단 섹션: 미션 */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 font-hakgyo">MISSION</h2>
                        <p className="text-xl max-w-3xl mx-auto">
                            Over the wall, just a inch.
                        </p>
                        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                            사람들이 온오프라인에 만나는 대중문화를 즐기기 위한 장애물을 없애는 것이다.
                            그리고 그래야만 새로운 조직의 형태와 활동범위를 제시하는 것이다.
                        </p>
                    </div>
                    
                    <div className="mt-20">
                        <h3 className="text-2xl font-bold mb-10 text-center">Milestone</h3>
                        <div className="flex flex-col md:flex-row justify-between items-start relative">
                            {/* 타임라인 라인 */}
                            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-800"></div>
                            
                            {/* 1st 마일스톤 */}
                            <div className="md:w-1/3 relative mb-12 md:mb-0 md:px-4">
                                <h4 className="text-4xl font-bold mb-6">1st</h4>
                                <div className="w-full h-0.5 bg-white mb-6"></div>
                                <div className="mt-2">
                                    <p className="font-medium mb-1">2021년</p>
                                    <p className="text-gray-400">
                                        서비스 런칭<br />
                                        첫 번째 프로젝트 진행<br />
                                        팀 구성
                                    </p>
                                </div>
                            </div>
                            
                            {/* 2nd 마일스톤 */}
                            <div className="md:w-1/3 relative mb-12 md:mb-0 md:px-4">
                                <h4 className="text-4xl font-bold mb-6">2nd</h4>
                                <div className="w-full h-0.5 bg-white mb-6"></div>
                                <div className="mt-2">
                                    <p className="font-medium mb-1">2022년 상반기</p>
                                    <p className="text-gray-400">
                                        서비스 확장<br />
                                        플랫폼 개발<br />
                                        콘텐츠 확대
                                    </p>
                                </div>
                            </div>
                            
                            {/* 3rd 마일스톤 */}
                            <div className="md:w-1/3 relative md:px-4">
                                <h4 className="text-4xl font-bold mb-6">3rd</h4>
                                <div className="w-full h-0.5 bg-white mb-6"></div>
                                <div className="mt-2">
                                    <p className="font-medium mb-1">2022년 하반기</p>
                                    <p className="text-gray-400">
                                        글로벌 진출<br />
                                        파트너십 구축<br />
                                        투자 유치
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-16">
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                우리는 꾸준히 성장하며 K-Culture의 새로운 가치를 만들어가고 있습니다.<br />
                                앞으로도 혁신적인 서비스로 보답하겠습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 하단 섹션: 프로젝트 소개 */}
            <section className="py-20 bg-black text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-16">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
                                <span className="text-black font-bold">B</span>
                            </div>
                            <h2 className="text-4xl font-bold font-hakgyo">INSIGHT</h2>
                        </div>
                        <p className="text-gray-300 max-w-2xl">
                            우리는 K-Culture의 잠재력과 글로벌 영향력을 이해하고, 이를 기반으로 혁신적인 프로젝트를 개발합니다. 
                            각 프로젝트는 팬과 크리에이터의 니즈를 충족시키는 동시에 문화적 가치를 창출합니다.
                        </p>
                    </div>
                    
                    {/* 프로젝트 그리드 - 첫 번째 줄 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* 프로젝트 1 */}
                        <div>
                            <div style={{backgroundColor: "#000000"}} className="rounded-lg overflow-hidden aspect-[3/4] mb-4 shadow-xl"></div>
                            <h3 className="text-xl font-bold mb-2">컨텐츠 제작</h3>
                            <p className="text-gray-400">K-pop과 관련된 다양한 형태의 콘텐츠를 기획하고 제작합니다.</p>
                        </div>
                        
                        {/* 프로젝트 2 */}
                        <div>
                            <div style={{backgroundColor: "#000000"}} className="rounded-lg overflow-hidden aspect-[3/4] mb-4 shadow-xl"></div>
                            <h3 className="text-xl font-bold mb-2">Playlist_bada</h3>
                            <p className="text-gray-400">K-pop 아티스트별 큐레이션 플레이리스트 서비스를 제공합니다.</p>
                        </div>
                        
                        {/* 프로젝트 3 */}
                        <div>
                            <div style={{backgroundColor: "#000000"}} className="rounded-lg overflow-hidden aspect-[3/4] mb-4 shadow-xl"></div>
                            <h3 className="text-xl font-bold mb-2">Newsletter</h3>
                            <p className="text-gray-400">최신 K-Culture 트렌드와 인사이트를 담은 뉴스레터를 발행합니다.</p>
                        </div>
                    </div>
                    
                    {/* 프로젝트 그리드 - 두 번째 줄 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 프로젝트 4 */}
                        <div>
                            <div style={{backgroundColor: "#000000"}} className="rounded-lg overflow-hidden aspect-[3/4] mb-4 shadow-xl"></div>
                            <h3 className="text-xl font-bold mb-2">Article</h3>
                            <p className="text-gray-400">K-Culture 관련 분석 기사와 논평을 발행합니다.</p>
                        </div>
                        
                        {/* 프로젝트 5 */}
                        <div>
                            <div style={{backgroundColor: "#000000"}} className="rounded-lg overflow-hidden aspect-[3/4] mb-4 shadow-xl"></div>
                            <h3 className="text-xl font-bold mb-2">아티스트 지원</h3>
                            <p className="text-gray-400">신인 아티스트를 발굴하고 다양한 형태로 지원합니다.</p>
                        </div>
                        
                        {/* 프로젝트 6 */}
                        <div>
                            <div style={{backgroundColor: "#000000"}} className="rounded-lg overflow-hidden aspect-[3/4] mb-4 shadow-xl"></div>
                            <h3 className="text-xl font-bold mb-2">컨텐츠 제작</h3>
                            <p className="text-gray-400">K-Drama, K-Movie 등 다양한 한류 콘텐츠를 분석하고 소개합니다.</p>
                        </div>
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default AboutPage; 