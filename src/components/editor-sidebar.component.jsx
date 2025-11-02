import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";
import { uploadImage } from "../common/aws";
import { toast } from "react-hot-toast";
import Tag from "./tags.component";
import defaultBanner from "../imgs/defaultbanner.jpeg";

const EditorSidebar = () => {
    const { blog = {}, setBlog } = useContext(EditorContext);
    const { banner = '', title = '', tags = [], des = '' } = blog;

    const characterLimit = 200;
    const tagLimit = 10;

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {
            let loadingToast = toast.loading("업로드 중...");

            uploadImage(img)
                .then((url) => {
                    if (url) {
                        toast.dismiss(loadingToast);
                        toast.success("업로드 완료 👍");
                        setBlog({ ...blog, banner: url });
                    }
                })
                .catch((err) => {
                    toast.dismiss(loadingToast);
                    return toast.error(err);
                });
        }
    };

    const handleBannerDelete = () => {
        setBlog({ ...blog, banner: '' });
        toast.success("배너가 제거되었습니다");
    };

    const handleDesChange = (e) => {
        const input = e.target;
        if (input.value.length <= characterLimit) {
            setBlog({ ...blog, des: input.value });
        }
    };

    const handleTagKeyDown = (e) => {
        if (e.keyCode == 13 || e.keyCode == 188) {
            e.preventDefault();

            let tag = e.target.value.trim();

            if (tags.length < tagLimit) {
                if (!tags.includes(tag) && tag.length) {
                    setBlog({ ...blog, tags: [...tags, tag] });
                }
            } else {
                toast.error(`최대 ${tagLimit}개까지 태그를 추가할 수 있습니다`);
            }

            e.target.value = "";
        }
    };

    const handleError = (e) => {
        // 배너 이미지 로드 실패 시 기본 이미지 대신 placeholder 표시
        let img = e.target;
        img.style.display = 'none';
        // 부모 요소에 placeholder 표시 로직이 있으므로 그대로 유지
    };

    return (
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                {/* 배너 이미지 섹션 */}
                <div className="space-y-2">
                    <p className="text-sm text-dark-grey">배너 이미지</p>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-grey border border-black/10">
                        <label htmlFor="sidebar-uploadBanner" className="cursor-pointer block w-full h-full">
                            {banner && banner.trim() ? (
                                <>
                                    <img
                                        src={banner}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                        alt="Banner"
                                    />
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-grey text-dark-grey">
                                    <span className="text-sm">배너 이미지 추가</span>
                                </div>
                            )}
                            {banner && banner.trim() && (
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-sm">클릭하여 변경</span>
                                </div>
                            )}
                            <input
                                id="sidebar-uploadBanner"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                hidden
                                onChange={handleBannerUpload}
                            />
                        </label>
                        {banner && (
                            <button
                                onClick={handleBannerDelete}
                                className="absolute top-2 right-2 bg-black text-white rounded-full p-2 hover:opacity-80 transition-opacity"
                            >
                                <i className="fi fi-br-cross text-xs"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* 설명 입력 */}
                <div className="space-y-2">
                    <p className="text-sm text-dark-grey">설명</p>
                    <textarea
                        maxLength={characterLimit}
                        value={des}
                        onChange={handleDesChange}
                        placeholder="게시글에 대한 짧은 설명을 입력하세요 (최대 200자)"
                        className="h-32 resize-none leading-7 input-box pl-4 text-base"
                    />
                    <p className="text-xs text-dark-grey text-right">
                        {characterLimit - des.length}자 남음
                    </p>
                </div>

                {/* 태그 입력 */}
                <div className="space-y-2">
                    <p className="text-sm text-dark-grey">태그</p>
                    <div className="relative input-box pl-4 py-3 pb-4 min-h-[60px]">
                        <input
                            type="text"
                            placeholder="태그 추가 (Enter 또는 쉼표)"
                            className="w-full bg-transparent outline-none placeholder:text-dark-grey"
                            onKeyDown={handleTagKeyDown}
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                            {tags.map((tag, i) => (
                                <Tag tag={tag} tagIndex={i} key={i} />
                            ))}
                        </div>
                    </div>
                    <p className="text-xs text-dark-grey text-right">
                        {tagLimit - tags.length}개 남음
                    </p>
                </div>

                {/* 미리보기 카드 */}
                <div className="space-y-2">
                    <p className="text-sm text-dark-grey">미리보기</p>
                    <div className="border border-black/10 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                        {/* 배너 이미지 - 배너가 있을 때만 표시 */}
                        {banner && banner.trim() && (
                            <div className="w-full aspect-video bg-grey overflow-hidden">
                                <img
                                    src={banner}
                                    className="w-full h-full object-cover"
                                    onError={handleError}
                                    alt="Preview"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="text-xl font-medium leading-tight line-clamp-2 mb-2">
                                {title || "논타이틀"}
                            </h3>
                            <p className="text-sm text-dark-grey line-clamp-2">
                                {des || "게시글 설명이 여기에 표시됩니다..."}
                            </p>
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {tags.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="inline-flex items-center justify-center text-xs px-2 py-1 bg-[#00DD89] text-black font-normal rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                    {tags.length > 3 && (
                                        <span className="text-xs text-dark-grey">+{tags.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </aside>
    );
};

export default EditorSidebar;

