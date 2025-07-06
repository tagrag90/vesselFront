import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import bLogo from "../imgs/b-logo.png";
import { ThemeContext, UserContext } from '../App';
import UserNavigationPanel from "./user-navigation.component";
import axios from "axios";
import { storeInSession } from "../common/session";
import InPageNavigation, { activeTabRef } from "./inpage-navigation.component";

const Navbar = () => {

    const [ searchBoxVisibility, setSearchBoxVisibility ] = useState(false)
    const [ userNavPanel, setUserNavPanel ] = useState(false);
    const [ pageState, setPageState ] = useState("home");
    const location = useLocation();

    let { theme, setTheme } = useContext(ThemeContext);

    let navigate = useNavigate();

    const { userAuth, userAuth: { access_token, profile_img, new_notification_available }, setUserAuth } = useContext(UserContext);

    // 현재 경로에 따라 pageState 설정
    useEffect(() => {
        // 현재 URL 경로 확인
        const path = location.pathname;
        
        // 경로에 따라 페이지 상태 설정
        if (path === '/') {
            setPageState('home');
        } else if (path.includes('/article')) {
            setPageState('content');
        }
    }, [location]); // location이 변경될 때마다 실행

    useEffect(() => {

        if(access_token){
            axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notification", {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                setUserAuth({ ...userAuth, ...data })
            })
            .catch(err => {
                console.log(err)
            })
        }

    }, [access_token])

    // 카테고리 변경 함수
    const loadBlogByCategory = (e) => {
        let categoryText = e.target.innerText;
        let category = categoryText.toLowerCase();

        // 각 카테고리별 이동 처리
        if(category === "content") {
            navigate('/content');  // 콘텐츠 페이지로 이동
            setPageState(categoryText.toLowerCase());
            return;
        }

        // 홈 카테고리인 경우
        if(category === "home") {
            setPageState("home");
            navigate('/');
        } else {
            setPageState(category);
        }

        // 홈 페이지가 아닌 경우 홈 페이지로 이동
        if(location.pathname !== '/') {
            navigate('/');
        }
    }

    const handleUserNavPanel = () => {
        setUserNavPanel(currentVal => !currentVal);
    }

    const handleSearch = (e) => {
        let query = e.target.value;
        
        if(e.keyCode == 13 && query.length){
            navigate(`/search/${query}`);
        }
    }

    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200);
    }

    const changeTheme = () => {
        
        let newTheme = theme == "light" ? "dark" : "light";

        setTheme(newTheme);

        document.body.setAttribute("data-theme", newTheme);

        storeInSession("theme", newTheme);

    }

    // 카테고리 목록
    const categories = [
        "Content"
    ];

    return (
        <>
            {/* 탭바가 내비게이션 바를 포함하는 구조로 변경 */}
            <div className="bg-black text-white">
                {/* 내비게이션 바 */}
                <nav className="navbar z-50 relative p-3">
                    <div className="w-full flex items-center justify-between relative">
                        {/* 모바일에서는 B 로고 이미지, 데스크톱에서는 텍스트 로고 */}
                        <Link to="/" className="flex-none w-12 h-12 md:hidden">
                            <img src={bLogo} className="w-full" alt="B Logo" />
                        </Link>
                        
                        <Link to="/" className="text-4xl font-bold text-white font-['Noto_Sans_KR'] absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                            Vessel
                        </Link>

                        <div className={"absolute bg-black w-full left-0 top-full mt-0.5 border-b border-gray-800 py-4 px-[5vw] md:border-0 md:relative md:inset-0 md:p-0 md:w-auto hidden"}>
                            <input 
                                type="text"
                                placeholder="Search"
                                className="w-full md:w-auto bg-gray-800 p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-gray-400 md:pl-12 text-white"
                                onKeyDown={handleSearch}
                            />

                            <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400"></i>
                        </div>

                        <div className="flex items-center gap-3 md:gap-6 ml-auto">
                            <button className="md:hidden bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center hidden"
                            onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
                            >
                                <i className="fi fi-rr-search text-xl text-white"></i>
                            </button>

                            <Link to="/editor" className="hidden md:flex gap-2 text-white hover:text-gray-300">
                                <i className="fi fi-rr-file-edit"></i>
                                <p>Write</p>
                            </Link>

                            {
                                access_token ? 
                                <>
                                    <Link to="/dashboard/notifications">
                                        <button className="w-12 h-12 rounded-full bg-gray-800 relative hover:bg-gray-700">
                                            <i className="fi fi-rr-bell text-2xl block mt-1 text-white"></i>
                                            {
                                                new_notification_available ? 
                                                <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span> : ""
                                            }
                                            
                                        </button>
                                    </Link>

                                    <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                        <button className="w-12 h-12 mt-1">
                                            <img src={profile_img} className="w-full h-full object-cover rounded-full" />
                                        </button>

                                        {
                                            userNavPanel ? <UserNavigationPanel /> : ""
                                        }

                                    </div>
                                </>
                                :
                                <>
                                    <Link className="bg-white text-black rounded-full py-2 px-6 font-medium hover:bg-gray-200" to="/signin">
                                    Sign In
                                    </Link>
                                    <Link className="border border-white text-white rounded-full py-2 px-6 font-medium hover:bg-white/10 hidden md:block" to="/signup">
                                        Sign Up
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </nav>

                {/* 탭바 */}
                <div className="" style={{backgroundColor: '#000000'}}>
                    <div className="max-w-3xl w-full mx-auto px-4">
                        <div className="flex justify-center gap-6 overflow-x-auto">
                            <button 
                                onClick={loadBlogByCategory} 
                                className={"py-2 text-sm font-medium border-b-2 " + (pageState === "home" ? "border-white text-white" : "border-transparent text-gray-400 hover:text-white")}
                            >
                                Home
                            </button>
                            {categories.map((category, i) => (
                                <button 
                                    key={i} 
                                    onClick={loadBlogByCategory} 
                                    className={"py-2 text-sm whitespace-nowrap font-medium border-b-2 " + (pageState === category.toLowerCase() ? "border-white text-white" : "border-transparent text-gray-400 hover:text-white")}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    )
}

export default Navbar;