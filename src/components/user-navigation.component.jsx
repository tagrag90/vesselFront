import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {

    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ access_token: null })
    }

    return (
        <AnimationWrapper 
            className="absolute right-0 z-50"
            transition={{ duration: 0.2 }}
        >

            <div className="bg-white absolute right-0 border border-black/10 shadow-md w-60 duration-200">

                <Link to="/editor" className="flex gap-2 link pl-8 py-4">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>글쓰기</p>
                </Link> 
                
                <span className="absolute border-t border-black/10 w-[100%]"></span>

                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    프로필
                </Link>

                <Link to="/dashboard/blogs" className="link pl-8 py-4">
                    대시보드
                </Link>

                <Link to="/settings/edit-profile" className="link pl-8 py-4">
                    설정
                </Link>

                <span className="absolute border-t border-black/10 w-[100%]"></span>

                <button className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                    onClick={signOutUser}
                >
                    <h1 className="font-bold text-xl mg-1">로그아웃</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>

            </div>

        </AnimationWrapper>
    )

}

export default UserNavigationPanel;