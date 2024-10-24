const VideoAllDetail=(state={}, action)=>{
    switch(action.type){
        case 'VIDEODETAIL':
            return action.payload
        default:
            return state
    }
}

export default VideoAllDetail;