const initialState={
    users: [],
    user: null
};

export default function(state = initialState, action){
    switch(action.type){
        case "SET_CURRENT_USER":
            return{
                ...state,
                user: action.payload,
            }
        case "ADD_USER":
            return{
                 ...state,
                 users: [...state.users, action.payload.newUser],
           }
        case "GET_USERS":
            return{
                 ...state,
                 users: action.payload
           }
        case 'DELETE_USER':
            return{
                ...state,
                users: state.users.filter( user => user._id !== action.payload.id),
            }  
        default:
            return state;
    }
}