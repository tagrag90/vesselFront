/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";
import defaultBanner from "../imgs/defaultbanner.jpeg";

const BlogPostCard = ({ content, author }) => {

    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return ( 
        <Link to={`/blog/${id}`} className="block rounded-lg overflow-hidden border border-black h-full">
            {/* 배너 이미지 */}
            <div className="w-full aspect-video">
                <img 
                    src={banner || defaultBanner} 
                    className="w-full h-full object-cover rounded-t-lg" 
                    alt={title}
                />
            </div>
            
            {/* 텍스트 콘텐츠 - 수직으로 배치 */}
            <div className="p-5 bg-white">
                {/* 태그 */}
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-white text-black border border-black mb-3">
                    {tags[0]}
                </span>
                
                {/* 제목 */}
                <h1 className="blog-title text-black mb-3">{title}</h1>
                
                {/* 설명 (선택적으로 표시) */}
                <p className="text-gray-600 line-clamp-2 mb-3 max-sm:hidden">{des}</p>
                
                {/* 작성자 정보 */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <img src={profile_img} className="w-6 h-6 rounded-full" />
                    <p className="text-gray-800 text-sm">
                        {fullname}
                    </p>
                    <span className="text-gray-400 text-xs">•</span>
                    <p className="text-gray-500 text-sm">
                        {getDay(publishedAt)}
                    </p>
                    <span className="text-gray-400 text-xs ml-auto">•</span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <i className="fi fi-rr-heart text-sm"></i>
                        {total_likes}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default BlogPostCard;