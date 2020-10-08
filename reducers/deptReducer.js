
const initState = {
    data:[],
    loading:true
}

export const deptReducer = (state = initState,action)=>{
    if(action.type=="ADD_DEPTDATA"){
         return {
             ...state,
             data:action.payload
         }
    }
    if(action.type=="SET_DEPTLOADING"){
        return {
            ...state,
            loading:action.payload
        }
    }
    
    return state
}


