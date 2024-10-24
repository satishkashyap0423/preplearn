const RelatedTopicList=(state={}, action)=>{
    switch(action.type){
        case 'RELATEDTOPICLIST':
            return action.payload
        default:
            return state
    }
}

export default RelatedTopicList;