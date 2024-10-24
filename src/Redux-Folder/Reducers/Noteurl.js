const Noteurl=(state="", action)=>{
    switch(action.type){
        case 'NOTES':
            return action.payload
        default:
            return state
    }
}

export default Noteurl;