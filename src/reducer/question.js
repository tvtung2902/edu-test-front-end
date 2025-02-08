const initialState = {
    questions: [],
    loading: false,
    error: null,
};

export const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DATA_QUESTION_REQUEST":
        case "ADD_QUESTION_REQUEST":
        case "UPDATE_QUESTION_REQUEST":
        case "DELETE_QUESTION_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "FETCH_DATA_QUESTION_SUCCESS":
            return {
                ...state,
                loading: false,
                questions: action.payload
            }
        case "FETCH_DATA_QUESTION_FAILURE":
        case "ADD_QUESTION_FAILURE":
        case "UPDATE_QUESTION_FAILURE":
        case "DELETE_QUESTION_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "ADD_QUESTION_SUCCESS":
            console.log(action.payload);
            return{
                ...state,
                loading: false,
                questions: [
                    ...state.questions,
                    action.payload
                ]
            }
        case "UPDATE_QUESTION_SUCCESS":
            return{
                ...state,
                loading: false,
                questions: [
                    ...state.questions.map(it => {
                        if(it.id === action.payload.id) return action.payload;
                        else return it;
                    })
                ]
            }
        case "DELETE_QUESTION_SUCCESS":
            return {
                ...state,
                loading: false,
                questions: [
                    ...state.questions.filter(it => {
                        return it.id !== action.payload
                    })
                ]
            }
        default:
            return state;
    }
}