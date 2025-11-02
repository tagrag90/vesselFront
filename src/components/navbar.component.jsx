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
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
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
        } else if (path.includes('/content') || path.includes('/article')) {
            setPageState('content');
        } else {
            setPageState('home');
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
        let categoryText = e.target.innerText.trim();
        let category = categoryText.toLowerCase();

        // 각 카테고리별 이동 처리
        if(category === "content" || categoryText === "Content") {
            setPageState("content");
            navigate('/content');
            return;
        }

        // 홈 카테고리인 경우
        if(category === "home" || categoryText === "Home") {
            setPageState("home");
            navigate('/');
            return;
        }

        setPageState(category);
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
            {/* 헤더 통합 (heypop.kr 스타일) */}
            <nav className="navbar z-50 relative border-b border-black/10">
                <div className="w-full max-w-[1400px] mx-auto px-[5vw] md:px-[7vw] lg:px-[10vw]">
                    <div className="grid grid-cols-3 items-center h-16 gap-6">
                        {/* 좌측: 로고 */}
                        <div className="flex items-center">
                            <button 
                                className="md:hidden w-10 h-10 flex items-center justify-center text-black mr-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <i className={mobileMenuOpen ? "fi fi-rr-cross text-xl" : "fi fi-rr-bars text-xl"}></i>
                            </button>
                            <Link to="/" className="flex-none" onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex items-center gap-3">
                                    <img src={bLogo} className="w-8 h-8 md:hidden" alt="B Logo" />
                                    <div className="flex items-baseline gap-2 hidden md:flex">
                                        <span className="text-2xl md:text-3xl font-bold text-black">
                                            Vessel
                                        </span>
                                        <span className="text-xs text-dark-grey font-normal">
                                            Studio_bada
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* 중앙: Home, Content */}
                        <div className="hidden md:flex items-center justify-center gap-6">
                            <button 
                                onClick={loadBlogByCategory} 
                                className={"text-sm font-medium py-2 px-1 border-b-2 transition-colors " + (pageState === "home" ? "border-black text-black" : "border-transparent text-dark-grey hover:text-black")}
                            >
                                Home
                            </button>
                            {categories.map((category, i) => (
                                <button 
                                    key={i} 
                                    onClick={loadBlogByCategory} 
                                    className={"text-sm font-medium py-2 px-1 whitespace-nowrap border-b-2 transition-colors " + (pageState === category.toLowerCase() ? "border-black text-black" : "border-transparent text-dark-grey hover:text-black")}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* 모바일 메뉴 */}
                        {mobileMenuOpen && (
                            <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-black/10 shadow-lg z-[60] max-h-[calc(100vh-64px)] overflow-y-auto">
                                <div className="flex flex-col px-[5vw] py-4 gap-0">
                                    <Link 
                                        to="/" 
                                        className="text-sm font-medium py-3 border-b border-black/10 hover:bg-grey/30 transition-colors"
                                        onClick={() => { setMobileMenuOpen(false); setPageState('home'); }}
                                    >
                                        Home
                                    </Link>
                                    {categories.map((category, i) => (
                                        <Link 
                                            key={i} 
                                            to={category.toLowerCase() === 'content' ? '/content' : '/'}
                                            className="text-sm font-medium py-3 border-b border-black/10 hover:bg-grey/30 transition-colors"
                                            onClick={() => { 
                                                setMobileMenuOpen(false); 
                                                loadBlogByCategory({ target: { innerText: category } }); 
                                            }}
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 우측: 검색, 알림, 프로필 */}
                        <div className="flex items-center justify-end gap-3 md:gap-4">
                            {/* 검색 (데스크톱) */}
                            <div className="hidden md:block relative">
                                <div className="relative">
                                    <input 
                                        type="text"
                                        placeholder="검색"
                                        className="bg-grey w-48 px-4 py-2 pl-10 pr-4 rounded-full text-sm placeholder:text-dark-grey text-black border border-black/10 focus:bg-white focus:border-black focus:outline-none transition-all"
                                        onKeyDown={handleSearch}
                                    />
                                    <i className="fi fi-rr-search absolute left-3 top-1/2 -translate-y-1/2 text-dark-grey"></i>
                                </div>
                            </div>

                            {/* 검색 버튼 (모바일) */}
                            <button 
                                className="md:hidden w-10 h-10 flex items-center justify-center text-black"
                                onClick={() => {
                                    setSearchBoxVisibility(currentVal => !currentVal);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <i className="fi fi-rr-search text-xl"></i>
                            </button>

                            {/* 모바일 검색창 */}
                            {searchBoxVisibility && (
                                <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-black/10 shadow-lg p-4 z-[60]">
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            placeholder="검색"
                                            className="w-full bg-grey px-4 py-2 pl-10 pr-10 rounded-full text-sm placeholder:text-dark-grey text-black border border-black/10 focus:bg-white focus:border-black focus:outline-none"
                                            onKeyDown={handleSearch}
                                            autoFocus
                                        />
                                        <i className="fi fi-rr-search absolute left-3 top-1/2 -translate-y-1/2 text-dark-grey"></i>
                                        <button 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-grey hover:text-black"
                                            onClick={() => setSearchBoxVisibility(false)}
                                        >
                                            <i className="fi fi-rr-cross text-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 로그인 상태별 메뉴 */}
                            {
                                access_token ? 
                                <>
                                    <Link to="/dashboard/notifications" className="relative">
                                        <button className="w-10 h-10 rounded-full bg-grey flex items-center justify-center hover:bg-black/10 border border-black/10 transition-colors">
                                            <i className="fi fi-rr-bell text-lg text-black"></i>
                                            {
                                                new_notification_available ? 
                                                <span className="bg-red w-2.5 h-2.5 rounded-full absolute top-1 right-1 border-2 border-white"></span> : ""
                                            }
                                        </button>
                                    </Link>

                                    <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                        <button className="w-10 h-10">
                                            <img src={profile_img} className="w-full h-full object-cover rounded-full" alt="Profile" />
                                        </button>
                                        {userNavPanel ? <UserNavigationPanel /> : ""}
                                    </div>
                                </>
                                :
                                <>
                                    <Link className="bg-black text-white rounded-full py-2 px-5 text-sm font-medium hover:opacity-80 transition-opacity hidden md:block" to="/signin">
                                        로그인
                                    </Link>
                                    <Link className="border border-black text-black rounded-full py-2 px-5 text-sm font-medium hover:bg-grey transition-colors hidden md:block" to="/signup">
                                        가입하기
                                    </Link>
                                    <Link className="bg-black text-white rounded-full py-2 px-5 text-sm font-medium hover:opacity-80 transition-opacity md:hidden" to="/signin">
                                        로그인
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Navbar;