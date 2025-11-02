import { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";

const Tag = ({ tag, tagIndex }) => {

    let { blog, blog: { tags }, setBlog } = useContext(EditorContext);

    const addEditable = (e) => {
        e.target.setAttribute("contentEditable", true);
        e.target.focus();
    }

    const handleTagEdit = (e) => {
        if(e.keyCode == 13 || e.keyCode == 188){

            e.preventDefault();

            let currentTag = e.target.innerText; 

            tags[tagIndex] = currentTag;

            setBlog({ ...blog, tags });
            
            e.target.setAttribute("contentEditable", false);

        }
    }

    const handleTagDelete = () => {
        
        tags = tags.filter(t => t != tag);
        setBlog({ ...blog, tags })

    }

    return (
        <div className="relative inline-flex items-center justify-center px-3 py-1 mt-2 mr-2 bg-[#00DD89] text-black font-normal rounded-full pr-8">
            <p className="outline-none" onKeyDown={handleTagEdit} onClick={addEditable}>{tag}</p>
            <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
                onClick={handleTagDelete}
            >
                <i className="fi fi-br-cross text-xs pointer-events-none"></i>
            </button>
        </div>
    )
}

export default Tag;