const Profiledetails=(state={}, action)=>{
    switch(action.type){
        case 'PROFILE':
            return action.payload
        default:
            return state
    }
}

export default Profiledetails;