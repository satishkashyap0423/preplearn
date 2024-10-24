export const ProfileDetails = (userdetail)=>{
    return{
        type:"PROFILE",
        payload:userdetail
    }
}

export const SelectUserBatch = (batch)=>{
    return{
        type:"SELECTUSERBATCH",
        payload:batch
    }
}


export const RelatedTopicList = (topiclist)=>{
    return{
        type:"RELATEDTOPICLIST",
        payload:topiclist
    }
}


export const RelatedFreeTopicList = (topiclist)=>{
    return{
        type:"RELATEDFREETOPICLIST",
        payload:topiclist
    }
}


export const VideoAllDetail = (videodetail)=>{
    return{
        type:"VIDEODETAIL",
        payload:videodetail
    }
}

export const Noteurl = (topiclist)=>{
    return{
        type:"NOTES",
        payload:topiclist
    }
}
