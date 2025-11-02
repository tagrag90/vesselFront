/* eslint-disable react/prop-types */
import { getDay, getFormattedDate } from "../common/date";
import { Link } from "react-router-dom";
import defaultBanner from "../imgs/defaultbanner.jpeg";

const BlogPostCard = ({ content, author }) => {

    let { publishedAt, tags = [], title, des, banner, activity = {}, blog_id: id } = content;
    let { total_likes = 0 } = activity;
    let { fullname, profile_img, username } = author || {};

    return ( 
        <Link to={`/blog/${id}`} className="block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-150 bg-white h-full flex flex-col">
            {/* 배너 이미지 - 배너가 있을 때만 표시 */}
            {banner && banner.trim() && (
                <div className="w-full aspect-video flex-shrink-0">
                    <img 
                        src={banner} 
                        className="w-full h-full object-cover rounded-t-lg" 
                        alt={title}
                    />
                </div>
            )}
            
            {/* 텍스트 콘텐츠 - 일관된 높이 */}
            <div className={`p-6 bg-white flex flex-col flex-grow ${banner && banner.trim() ? 'rounded-b-lg' : 'rounded-lg'}`}>
                {/* 날짜 (상단) - 고정 높이 */}
                <div className="h-5 mb-2">
                    {publishedAt && (
                        <p className="text-dark-grey text-sm">{getFormattedDate(publishedAt)}</p>
                    )}
                </div>
                
                {/* 태그 - 고정 높이 */}
                <div className="h-7 mb-3">
                    {tags && tags.length > 0 && (
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#00DD89] text-black font-normal">
                            {tags[0]}
                        </span>
                    )}
                </div>
                
                {/* 제목 - 고정 높이 3줄 */}
                <div className="mb-3 min-h-[4.5rem]">
                    <h1 className="text-xl font-bold text-black line-clamp-3">{title || '논타이틀'}</h1>
                </div>
                
                {/* 설명 - 고정 높이 2줄 */}
                <div className="h-10 mb-4 max-sm:hidden flex-shrink-0">
                    <p className="text-dark-grey line-clamp-2">{des || ''}</p>
                </div>
                
                {/* 작성자 정보 - 하단 고정 */}
                <div className="flex items-center gap-2 pt-3 border-t border-black/10 mt-auto flex-shrink-0">
                    {profile_img && (
                        <img src={profile_img} className="w-6 h-6 rounded-full flex-shrink-0" alt={fullname || ''} />
                    )}
                    {fullname && (
                        <p className="text-black text-sm truncate">
                            {fullname}
                        </p>
                    )}
                    <span className="text-dark-grey text-xs ml-auto flex-shrink-0">•</span>
                    <span className="flex items-center gap-1 text-dark-grey text-sm flex-shrink-0">
                        <i className="fi fi-rr-heart text-sm"></i>
                        {total_likes || 0}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default BlogPostCard;