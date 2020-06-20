const initialState={
    employees:[],
    employee:null
};

export default function(state = initialState, action){
    switch(action.type){
        case 'GET_EMPLOYEES':
            return{
                ...state,
                employees: action.payload,
            };
        case 'GET_EMPLOYEE':
            return{
                ...state,
                employee: action.payload
            };
        case 'ADD_EMPLOYEE':
            return{
                ...state,
            };
        case 'EDIT_EMPLOYEE':
                return{
                    ...state,
                };
        case 'DELETE_EMPLOYEE':
            return{
                ...state,
                employees: state.employees.filter( emp => emp._id !== action.payload),
                employee: null
            }
        default:
            return state;
    }
}