
const initState = {
    docdata:[],
    refreshloading:true
}

export const doctorReducer = (state = initState,action)=>{
    if(action.type=="ADD_DOCDATA"){
         return {
             ...state,
             docdata:action.payload
         }
    }
    if(action.type=="SET_DOCLOADING"){
        return {
            ...state,
            refreshloading:action.payload
        }
    }
    
    return state
}


