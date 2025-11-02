import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="font-['Noto_Sans_KR'] bg-black">
            <div className="text-white pt-32 pb-24">
                {/* 링크 섹션 */}
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex justify-between mb-32">
                        {/* 왼쪽 링크 */}
                        <div className="flex flex-col space-y-6">
                            <Link to="/" className="text-white hover:text-white/80 transition-colors text-xl">DivetoBada.com</Link>
                            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-xl">Why attend</Link>
                            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-xl">Code of conduct</Link>
                        </div>
                        
                        {/* 오른쪽 링크 (소셜) */}
                        <div className="flex flex-col space-y-6">
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors text-xl"
                            >
                                Twitter
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors text-xl"
                            >
                                Instagram
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors text-xl"
                            >
                                YouTube
                            </a>
                        </div>
                    </div>
                    
                    {/* 로고 텍스트 */}
                    <div className="flex justify-center mb-32">
                        <h1 className="text-white font-bold text-[12rem] tracking-[-0.02em]">
                            Studio_bada
                        </h1>
                    </div>
                    
                    {/* 저작권 정보 */}
                    <div className="flex justify-between items-center text-gray-500">
                        <p className="text-base">©</p>
                        <div className="flex space-x-8">
                            <a 
                                href="mailto:teambada1206@gmail.com"
                                className="text-gray-500 hover:text-white transition-colors text-base"
                            >
                                Contact
                            </a>
                            <a 
                                href="#"
                                className="text-gray-500 hover:text-white transition-colors text-base"
                            >
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 