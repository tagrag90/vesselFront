const LoadMoreDataBtn = ({ state, fetchDataFun, additionalParam }) => {

    if(state != null && state.totalDocs > state.results.length){
        return (
            <div className="flex justify-center mt-8 mb-10">
                <button
                onClick={() => fetchDataFun({ ...additionalParam , page: state.page + 1 })}
                className="bg-black text-white py-3 px-8 border-2 border-black rounded-md hover:bg-black/80 transition-colors duration-300 font-medium text-center min-w-[200px]"
                >
                    More
                </button>
            </div>
        )   
    }

}

export default LoadMoreDataBtn;