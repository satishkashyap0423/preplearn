const SelectUserBatch=(state={}, action)=>{
    switch(action.type){
        case 'SELECTUSERBATCH':
            return action.payload
        default:
            return state
    }
}

export default SelectUserBatch;