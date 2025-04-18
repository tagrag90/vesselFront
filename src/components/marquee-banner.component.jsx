import React from 'react';

const MarqueeBanner = ({ 
    text = "",
    altText = "", 
    bgColor = "#000000", 
    textColor = "#ffffff", 
    imageSrc = null 
}) => {
    // 이미지가 있는 경우 텍스트와 이미지를 번갈아 표시할 컨텐츠 생성
    const createContent = () => {
        if (imageSrc) {
            const items = [];
            // 텍스트와 이미지를 번갈아 추가 (두 개의 텍스트와 이미지)
            for (let i = 0; i < 20; i++) {
                // 첫 번째 텍스트
                items.push(
                    <span key={`text1-${i}`} className="mx-3 text-lg">
                        {text}
                    </span>
                );
                // 이미지
                items.push(
                    <img 
                        key={`img1-${i}`} 
                        src={imageSrc} 
                        alt="" 
                        className="h-10 w-auto inline-block mx-3" 
                    />
                );
                // 두 번째 텍스트 (altText가 있는 경우)
                if (altText) {
                    items.push(
                        <span key={`text2-${i}`} className="mx-3 text-lg">
                            {altText}
                        </span>
                    );
                    // 이미지 다시 추가
                    items.push(
                        <img 
                            key={`img2-${i}`} 
                            src={imageSrc} 
                            alt="" 
                            className="h-10 w-auto inline-block mx-3" 
                        />
                    );
                }
            }
            return items;
        } else {
            // 이미지가 없는 경우, 두 텍스트 번갈아 표시
            if (altText) {
                return Array(30).fill([text, altText]).flat().join(' ');
            }
            // 하나의 텍스트만 있는 경우
            return Array(50).fill(text).join(' ');
        }
    };
    
    // 텍스트만 반복하는 기존 방식
    const repeatedText = altText 
        ? Array(30).fill([text, altText]).flat().join(' ')
        : Array(50).fill(text).join(' ');
    
    return (
        <div className="w-full overflow-hidden py-4" style={{ backgroundColor: bgColor }}>
            <div className="marquee-container relative">
                <div className="marquee-content animate-marquee whitespace-nowrap flex items-center"
                    style={{ color: textColor }}>
                    {imageSrc ? createContent() : repeatedText}
                </div>
            </div>
            
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .marquee-container {
                    width: 100%;
                    overflow: hidden;
                }
                
                .marquee-content {
                    display: inline-block;
                    animation: marquee 60s linear infinite;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    font-family: 'Noto Sans KR', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default MarqueeBanner; 