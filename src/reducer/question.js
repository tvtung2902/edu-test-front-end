import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    ADD_REQUEST,
    ADD_SUCCESS,
    ADD_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILURE
} from '../action/actionType'

const initialState = {
    questions: [],
    loading: false,
    error: null,
};

export const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
        case ADD_REQUEST:
        case UPDATE_REQUEST:
        case DELETE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.payload
            }
        case FETCH_DATA_FAILURE:
        case ADD_FAILURE:
        case UPDATE_FAILURE:
        case DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_SUCCESS:
            console.log(action.payload);
            return{
                ...state,
                loading: false,
                questions: [
                    ...state.questions,
                    action.payload
                ]
            }
        case UPDATE_SUCCESS:
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
        case DELETE_SUCCESS:
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