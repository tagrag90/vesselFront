// importing tools

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Code from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";

import { uploadImage } from "../common/aws";

const uploadImageByFile = (e) => {
    return uploadImage(e).then(url => {
        if(url) {
            return {
                success: 1,
                file: { url }
            }
        }
    })
}

const uploadImageByURL = (e) => {
    let link = new Promise(( resolve, reject ) => {
        try {
            resolve(e)
        }
        catch(err) {
            reject(err)
        }
    })

    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

export const tools = {
    // 텍스트 블록
    header: {
        class: Header,
        config: {
            placeholder: "제목을 입력하세요....",
            levels: [2, 3],
            defaultLevel: 2
        },
        inlineToolbar: true
    },
    paragraph: {
        inlineToolbar: true,
    },
    list: {
        class: List,
        inlineToolbar: true,
        config: {
            defaultStyle: 'unordered'
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    code: {
        class: Code,
        config: {
            placeholder: '코드를 입력하세요...',
        }
    },
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    delimiter: Delimiter,
    
    // 미디어 블록
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByURL,
                uploadByFile: uploadImageByFile,
            }
        }
    },
    embed: {
        class: Embed,
        config: {
            services: {
                youtube: true,
                codepen: true,
                instagram: true,
                twitter: true
            }
        }
    },
    
    // 구조 블록
    table: {
        class: Table,
        config: {
            rows: 2,
            cols: 2,
        }
    },
    
    // 인라인 도구
    marker: {
        class: Marker
    },
    inlineCode: {
        class: InlineCode
    },
}

// 블록 타입 카테고리 정의
export const blockCategories = {
    text: ['header', 'paragraph', 'list', 'quote', 'code', 'checklist'],
    media: ['image', 'embed'],
    structure: ['table', 'delimiter']
};