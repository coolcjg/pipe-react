const initialState = {
    userId: ''
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'login': {

            console.log("action.payload : " + action.payload);
            return {
                ...state
                , userId: action.payload
            }
        }
        case 'logout': {
            return {
                ...state
                , userId: ''
            }
        }
        case 'getUserId': {
            return initialState;
        }
        default:
            return state
    }
}