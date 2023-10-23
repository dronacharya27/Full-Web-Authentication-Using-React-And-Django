import React from 'react'

const reducer = (state,action) => {
    switch (action.type) {
       
        case 'handledata':
            return {...state,[action.payload.name]:action.payload.value}
            
        case 'loader':
            return {...state,isloading:action.payload}
    
        default:
            break;
    }
}

export default reducer
