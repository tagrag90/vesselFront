/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";
import defaultBanner from "../imgs/defaultbanner.jpeg";

const MagazineBlogCard = ({ content, author }) => {

    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return ( 
        <Link to={`/blog/${id}`} className="block bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-300 group">
            <div className="flex flex-col md:flex-row">
                {/* 배너 이미지 */}
                <div className="md:w-80 md:flex-shrink-0">
                    <div className="h-48 md:h-full md:min-h-[200px]">
                        <img 
                            src={banner || defaultBanner} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            alt={title}
                        />
                    </div>
                </div>
                
                {/* 텍스트 콘텐츠 */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        {/* 태그 */}
                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-white text-black font-medium mb-3">
                            {tags[0]}
                        </span>
                        
                        {/* 제목 */}
                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors line-clamp-2">
                            {title}
                        </h2>
                        
                        {/* 설명 */}
                        <p className="text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                            {des}
                        </p>
                    </div>
                    
                    {/* 하단 정보 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={profile_img} className="w-10 h-10 rounded-full border-2 border-gray-700" />
                            <div>
                                <p className="text-white font-medium text-sm">
                                    {fullname}
                                </p>
                                <p className="text-gray-400 text-xs">
                                    {getDay(publishedAt)}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-400">
                            <i className="fi fi-rr-heart text-sm"></i>
                            <span className="text-sm">{total_likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MagazineBlogCard; 