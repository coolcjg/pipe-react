const initialState = {
    userId: ''
    , jwt: ''
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'login': {

            console.log(action.userId);
            console.log(action.jwt);;

            return {
                ...state
                , userId: action.userId
                , jwt: action.jwt
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