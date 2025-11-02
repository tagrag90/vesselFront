import axios from "axios";
import AnimationWrapper from "../common/page-animation"
import InputBox from "../components/input.component";
import { useContext, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../App"

const ChangePassword = () => {

    let { userAuth: { access_token } } = useContext(UserContext);

    let changePasswordForm = useRef();

    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(changePasswordForm.current);
        let formData = { };

        for(let [key, value] of form.entries()){
            formData[key] = value
        }

        let { currentPassword, newPassword } = formData;

        if (!currentPassword.length || !newPassword.length){
            return toast.error("모든 입력란을 채워주세요")
        }

        if(!passwordRegex.test(currentPassword) || !passwordRegex.test(newPassword)){
            return toast.error("비밀번호는 6-20자이며 숫자, 소문자, 대문자를 각각 1개 이상 포함해야 합니다")
        }

        e.target.setAttribute("disabled", true);

        let loadingToast = toast.loading("업데이트 중...");

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/change-password", formData, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(() => {
            toast.dismiss(loadingToast);
            e.target.removeAttribute("disabled");
            return toast.success("비밀번호가 변경되었습니다")
        })
        .catch(({ response }) => {
            toast.dismiss(loadingToast);
            e.target.removeAttribute("disabled");
            return toast.error(response.data.error)
        })


    }

    return (
        <AnimationWrapper>
            <Toaster />
            <form ref={changePasswordForm}>

                <h1 className="max-md:hidden">비밀번호 변경</h1>

                <div className="py-10 w-full md:max-w-[400px]">
                    <InputBox name="currentPassword" type="password" className="profile-edit-input" placeholder="현재 비밀번호" icon="fi-rr-unlock" />
                    <InputBox name="newPassword" type="password" className="profile-edit-input" placeholder="새 비밀번호" icon="fi-rr-unlock" />

                    <button onClick={handleSubmit} className="btn-dark px-10" type="submit">비밀번호 변경</button>
                </div>

            </form>
        </AnimationWrapper>
    )
}

export default ChangePassword;