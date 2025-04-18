import { useState, useRef, useEffect } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({ routes, defaultHidden = [ ], defaultActiveIndex = 0, children }) => {

    activeTabLineRef = useRef();
    activeTabRef = useRef();

    let [ inPageNavIndex, setInPageNavIndex ] = useState(null);

    let [ isResizeEventAdded, setIsResizeEventAdded ] = useState(false);
    let [ width, setWidth ] = useState(window.innerWidth);

    const changePageState = (btn, i) => {
        
        let { offsetWidth, offsetLeft } = btn; 

        activeTabLineRef.current.style.width = offsetWidth + "px"; 
        activeTabLineRef.current.style.left = offsetLeft + "px"; 

        setInPageNavIndex(i);

    }

    useEffect(() => {

        if(width > 766 && inPageNavIndex != defaultActiveIndex){
            changePageState( activeTabRef.current, defaultActiveIndex )
        }

        if(!isResizeEventAdded){
            window.addEventListener('resize', () => {
                if(!isResizeEventAdded){
                    setIsResizeEventAdded(true);
                }

                setWidth(window.innerWidth);
            })
        }

    }, [width])

    return (
        <>
            <div className="relative mb-8 bg-black border-b border-gray-800 flex flex-nowrap overflow-x-auto">
                
                {
                    routes.map((route, i) => {
                        return (
                            <button 
                            ref={ i == defaultActiveIndex ? activeTabRef : null }
                            key={i} 
                            className={"p-4 px-5 capitalize " + ( inPageNavIndex == i ? "text-white " : "text-gray-400 " ) + ( defaultHidden.includes(route) ? " md:hidden " : " " )} 
                            onClick={(e) => { changePageState(e.target, i) }}
                            >
                                { route }
                            </button>
                        )
                    })
                }

                <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300 border-white" />

            </div>

            { Array.isArray(children) ? children[inPageNavIndex] : children }

        </>
    )
}

export default InPageNavigation;