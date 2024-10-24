const RelatedFreeTopicList=(state={}, action)=>{
    switch(action.type){
        case 'RELATEDFREETOPICLIST':
            return action.payload
        default:
            return state
    }
}

export default RelatedFreeTopicList;