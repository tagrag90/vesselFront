import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";
import { storeInSession } from "../common/session";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";

const SSOPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('processing'); // processing, success, error
    const [error, setError] = useState('');
    
    const token = searchParams.get('token');
    const redirect = searchParams.get('redirect') || '/';

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setError('SSO 토큰이 없습니다');
            return;
        }

        // SSO 토큰으로 인증
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/sso/divetobada", {
            token
        })
        .then(({ data }) => {
            // 세션에 저장
            storeInSession("user", JSON.stringify(data));
            
            setStatus('success');
            
            // 리다이렉트
            setTimeout(() => {
                window.location.href = redirect;
            }, 1000);
        })
        .catch(err => {
            console.error('SSO Error:', err);
            setStatus('error');
            setError(err.response?.data?.error || 'Divetobada 연결에 실패했습니다');
        });
        
    }, [token, redirect]);

    if (status === 'processing') {
        return (
            <AnimationWrapper>
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <Loader />
                        <p className="mt-4 text-lg text-grey">Divetobada 계정으로 로그인 중...</p>
                    </div>
                </div>
            </AnimationWrapper>
        );
    }

    if (status === 'success') {
        return (
            <AnimationWrapper>
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <i className="fi fi-br-check-circle text-6xl text-green mb-4"></i>
                        <h1 className="text-2xl font-bold mb-2">로그인 성공!</h1>
                        <p className="text-grey">잠시 후 이동합니다...</p>
                    </div>
                </div>
            </AnimationWrapper>
        );
    }

    if (status === 'error') {
        return (
            <AnimationWrapper>
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <i className="fi fi-br-cross-circle text-6xl text-red mb-4"></i>
                        <h1 className="text-2xl font-bold mb-2">로그인 실패</h1>
                        <p className="text-grey mb-6">{error}</p>
                        <div className="flex gap-3 justify-center">
                            <a href="/" className="btn-dark">홈으로</a>
                            <a href="/signin" className="btn-light">로그인</a>
                        </div>
                    </div>
                </div>
            </AnimationWrapper>
        );
    }

    return <Navigate to="/" />;
};

export default SSOPage;

