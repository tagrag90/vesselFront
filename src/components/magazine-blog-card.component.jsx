/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const MagazineBlogCard = ({ content, author, index = 0 }) => {

    let { publishedAt, tags = [], title, des, banner, activity = {}, blog_id: id } = content;
    let { total_likes = 0 } = activity;
    let { fullname, profile_img, username } = author || {};

    return ( 
        <Link 
            to={`/blog/${id}`} 
            className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col border border-black"
            style={{ margin: 0, width: '100%' }}
        >
            {/* 이미지 영역 - 배너가 있을 때만 표시 */}
            {banner && banner.trim() && (
                <div className="w-full overflow-hidden bg-grey relative">
                    <img 
                        src={banner} 
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" 
                        alt={title || '논타이틀'}
                    />
                    
                    {/* 태그 오버레이 (이미지 상단) */}
                    {tags && tags[0] && (
                        <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-base bg-[#00DD89] text-black font-semibold shadow-md">
                                {tags[0]}
                            </span>
                        </div>
                    )}
                </div>
            )}
            
            {/* 태그 - 배너가 없을 때 상단에 표시 */}
            {(!banner || !banner.trim()) && tags && tags[0] && (
                <div className="px-8 pt-8">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-base bg-[#00DD89] text-black font-semibold">
                        {tags[0]}
                    </span>
                </div>
            )}
            
            {/* 텍스트 콘텐츠 */}
            <div className="p-8 flex flex-col flex-grow">
                {/* 제목 */}
                <h2 
                    className="font-semibold text-black mb-3 group-hover:text-black/80 transition-colors line-clamp-2 min-h-[3rem]"
                    style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1.5' }}
                >
                    {title || '논타이틀'}
                </h2>
                
                {/* 설명 */}
                {des && (
                    <p className="text-base text-dark-grey line-clamp-3 mb-6 leading-relaxed flex-grow">
                        {des}
                    </p>
                )}
                
                {/* 하단 정보 */}
                <div className="flex items-center justify-between pt-6 border-t border-black/10">
                    <div className="flex items-center gap-3">
                        {profile_img && (
                            <img 
                                src={profile_img} 
                                className="w-10 h-10 rounded-full border border-black/10" 
                                alt={fullname}
                            />
                        )}
                        <div>
                            {fullname && (
                                <p className="text-black font-medium text-sm">
                                    {fullname}
                                </p>
                            )}
                            <p className="text-dark-grey text-sm">
                                {getDay(publishedAt)}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-dark-grey">
                        <i className="fi fi-rr-heart text-sm"></i>
                        <span className="text-sm">{total_likes || 0}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MagazineBlogCard; 