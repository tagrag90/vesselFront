import { useNavigate, useParams, Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { UserContext } from "../App";
import EditorSidebar from "./editor-sidebar.component";

const BlogEditor = () => {

    let { blog = {}, setBlog, textEditor, setTextEditor } = useContext(EditorContext)
    let { title = '', content = [], des = '' } = blog

    let { userAuth: { access_token } } = useContext(UserContext)
    let { blog_id } = useParams();

    let navigate = useNavigate();
    const [lastSaved, setLastSaved] = useState(null);

    // useEffect
    useEffect(() => {
        // EditorJS가 아직 초기화되지 않았을 때만 실행
        if(!textEditor || !textEditor.isReady){
            // DOM이 준비될 때까지 대기
            const initEditor = () => {
                const holderElement = document.getElementById("textEditor");
                if (!holderElement) {
                    setTimeout(initEditor, 100);
                    return;
                }
                
                let editorData = null;
                if (content && (Array.isArray(content) ? content.length > 0 : content && Object.keys(content).length > 0)) {
                    editorData = Array.isArray(content) ? content[0] : content;
                }
                
                const editorInstance = new EditorJS({
                    holder: "textEditor",
                    data: editorData || { blocks: [] },
                    tools: tools,
                    placeholder: "글을 작성해보세요...",
                    minHeight: 400,
                    inlineToolbar: ['bold', 'italic', 'link', 'marker', 'inlineCode'],
                    autofocus: false,
                    readOnly: false,
                    defaultBlock: 'paragraph',
                    sanitizer: {
                        p: true,
                        a: {
                            href: true,
                            target: '_blank',
                            rel: 'nofollow'
                        },
                        b: true,
                        i: true,
                        code: true,
                        mark: true
                    }
                });
                
                editorInstance.isReady.then(() => {
                    setTextEditor(editorInstance);
                }).catch(err => {
                    console.error("EditorJS initialization failed:", err);
                });
            };
            
            initEditor();
        }
        
        // cleanup function
        return () => {
            if(textEditor && typeof textEditor.destroy === 'function'){
                textEditor.destroy().catch(err => {
                    console.error("EditorJS destroy failed:", err);
                });
            }
        };
    }, [content])

    const handleTitleKeyDown = (e) => {
        if(e.keyCode == 13) { // enter key
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        setBlog({ ...blog, title: e.target.value });
    };

    const handleEditorTitleKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    }

    const handlePublishEvent = () => {
        // 제목이 없으면 "논타이틀"로 대체
        const finalTitle = title.trim() || "논타이틀";
        
        // 설명과 태그는 선택 사항이므로 검증 제거
        // if(!des.length || des.length > 200){
        //     return toast.error("게시글 설명을 입력해주세요 (최대 200자)")
        // }

        // const tags = blog.tags || [];
        // if(!tags.length){
        //     return toast.error("최소 1개 이상의 태그를 입력해주세요")
        // }

        if(textEditor && typeof textEditor.save === 'function'){
            textEditor.save().then(data => {
                if(data.blocks && data.blocks.length){
                    const blogObj = {
                        title: finalTitle,
                        banner: blog.banner || "",
                        des: blog.des || "",
                        content: data,
                        tags: blog.tags || [],
                        draft: false
                    };

                    let loadingToast = toast.loading("Publishing....");

                    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id }, {
                        headers: {
                            'Authorization': `Bearer ${access_token}`
                        }
                    })
                    .then(() => {
                        toast.dismiss(loadingToast);
                        toast.success("발행 완료 👍");
                        setTimeout(() => {
                            navigate("/dashboard/blogs")
                        }, 500);
                    })
                    .catch(({ response }) => {
                        toast.dismiss(loadingToast);
                        return toast.error(response?.data?.error || "발행에 실패했습니다")
                    });
                } else{
                    return toast.error("게시글에 내용을 작성해주세요")
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const handleSaveDraft = (e) => {

        if(e.target.className.includes("disable")) {
            return;
        }

        // 제목이 없어도 임시 저장 가능하도록 수정 (제목 검증 제거)
        // if(!title.length){
        //     return toast.error("임시 저장하기 전에 제목을 입력해주세요")
        // }

        let loadingToast = toast.loading("임시 저장 중...");

        e.target.classList.add('disable');

        if(textEditor && typeof textEditor.save === 'function'){
            textEditor.save().then(content => {

                let blogObj = {
                    title: title || "논타이틀",
                    banner: blog.banner || "",
                    des: blog.des || "",
                    content: content,
                    tags: blog.tags || [],
                    draft: true
                }

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                .then(() => {
                    
                    e.target.classList.remove('disable');
        
                    toast.dismiss(loadingToast);
                    toast.success("저장 완료 👍");
                    
                    setLastSaved(new Date());
        
                    setTimeout(() => {
                        navigate("/dashboard/blogs?tab=draft")
                    }, 500);
        
                })
                .catch(( { response } ) => {
                    e.target.classList.remove('disable');
                    toast.dismiss(loadingToast);
        
                    return toast.error(response.data.error)
                })

            })
        }
    }

    const formatLastSaved = (date) => {
        if (!date) return null;
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
    };

    return (
        <>
            <Toaster />
            {/* 뒤로가기 버튼 - 좌측 상단 */}
            <div className="fixed top-6 left-6 z-50">
                <Link 
                    to="/"
                    className="flex items-center justify-center w-12 h-12 bg-white border border-black/10 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-grey"
                >
                    <i className="fi fi-rr-arrow-left text-black text-lg"></i>
                </Link>
            </div>
            
            <AnimationWrapper>
                <section className="py-8">
                    <div className="max-w-[1400px] mx-auto pl-[5vw] md:pl-[7vw] lg:pl-[10vw] pr-0">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12">
                            {/* 메인 에디터 영역 */}
                            <div className="max-w-[700px] mx-auto lg:mx-0 w-full">
                                {/* 제목 입력 - 에디터 상단에 크게 */}
                                <div className="mb-12 pb-6 border-b-2 border-black/10">
                                    <input
                                        type="text"
                                        placeholder="게시글 제목을 입력하세요"
                                        value={title}
                                        onChange={handleTitleChange}
                                        onKeyDown={handleEditorTitleKeyDown}
                                        className="w-full text-5xl md:text-6xl font-bold bg-transparent border-none outline-none placeholder:text-dark-grey focus:placeholder:text-black/30 transition-colors"
                                    />
                                </div>
                                
                                {/* 에디터 */}
                                <div id="textEditor" className="font-gelasio min-h-[400px]"></div>
                            </div>

                            {/* 사이드바 */}
                            <div className="w-full lg:border-l border-black/10 lg:pl-12">
                                <EditorSidebar />
                            </div>
                        </div>
                    </div>
                </section>
            </AnimationWrapper>
            
            {/* 하단 플로팅 호버 바 */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-black/10 rounded-full shadow-2xl px-6 py-3">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                        {lastSaved && (
                            <span className="text-xs text-dark-grey whitespace-nowrap">
                                {formatLastSaved(lastSaved)} 전에 저장됨
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn-light py-2 px-6 text-sm"
                            onClick={handleSaveDraft}
                        >
                            임시 저장
                        </button>
                        <button className="btn-dark py-2 px-6 text-sm"
                            onClick={handlePublishEvent}
                        >
                            발행
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogEditor;