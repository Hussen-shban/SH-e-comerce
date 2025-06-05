


export const initialstate = {
    selectCategory: "all"
}

export const reducer =(state ,action)=>{

   switch(action.type){

    case "SET_CATEGORY" :
         return {...state,selectCategory:action.payload}

         default :
         return state
    
   }

}
