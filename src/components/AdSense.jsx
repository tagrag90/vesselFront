import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AdSense = ({ adSlot, adFormat, style }) => {
  const adRef = useRef(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adAttempts, setAdAttempts] = useState(0);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에만 광고를 로드합니다
    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !adRef.current.dataset.adsbygoogleStatus && adAttempts < 3) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          console.log('AdSense 광고 로드 시도:', adSlot, '시도 횟수:', adAttempts + 1);
          setAdAttempts(prev => prev + 1);
          
          // 로드 상태 감지 (약 3초 후에 로드 상태 확인)
          setTimeout(() => {
            if (adRef.current && adRef.current.dataset.adsbygoogleStatus === 'done') {
              setIsAdLoaded(true);
              console.log('AdSense 광고 로드 성공:', adSlot);
            }
          }, 3000);
        } else if (!window.adsbygoogle && adAttempts < 3) {
          // adsbygoogle이 아직 로드되지 않은 경우 나중에 다시 시도
          console.log('AdSense 스크립트가 아직 로드되지 않았습니다. 1.5초 후 다시 시도합니다.');
          setTimeout(() => {
            setAdAttempts(prev => prev + 1);
            loadAd();
          }, 1500);
        }
      } catch (error) {
        console.error('AdSense 광고 로드 실패:', error);
      }
    };

    // 페이지가 완전히 로드된 후 광고 로드
    const handleLoad = () => {
      // 약간의 지연 후 광고 로드 (페이지 로드 후 500ms)
      setTimeout(loadAd, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [adSlot, adAttempts]);

  // 광고 컨테이너 스타일 설정
  const containerStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: '20px 0',
    minHeight: adFormat === 'fluid' ? '120px' : '100px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #eee',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    ...style
  };

  // 광고가 로드되면 배경과 테두리 스타일 제거
  if (isAdLoaded) {
    containerStyle.backgroundColor = 'transparent';
    containerStyle.border = 'none';
  }

  return (
    <div className="ad-container" style={containerStyle}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
          height: adFormat === 'fluid' ? 'auto' : '100px',
        }}
        data-ad-client="ca-pub-2040931113750470"
        data-ad-slot={adSlot}
        data-ad-format={adFormat || 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  );
};

AdSense.propTypes = {
  adSlot: PropTypes.string.isRequired,
  adFormat: PropTypes.string,
  style: PropTypes.object
};

export default AdSense; 