const initialState = {
    categories: [],
    status: 'idle',
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORY_REQUEST":
        case "ADD_CATEGORY_REQUEST":
        case "UPDATE_CATEGORY_REQUEST":
        case "DELETE_CATEGORY_REQUEST":
            return {
                ...state,
                status: 'loading',
                error: null,
            };

        case "FETCH_CATEGORY_SUCCESS":            
            return {
                ...state,
                categories: action.payload,
                status: 'success',
            };

        case "FETCH_CATEGORY_FAILURE":
        case "ADD_CATEGORY_FAILURE":
        case "UPDATE_CATEGORY_FAILURE":
        case "DELETE_CATEGORY_FAILURE":
            return {
                ...state,
                status: 'failure',
                error: action.payload,
            };

        case "ADD_CATEGORY_SUCCESS":
            return {
                ...state,
                status: 'success',
                categories: [...state.categories, action.payload],
            };

        case "UPDATE_CATEGORY_SUCCESS":
            return {
                ...state,
                status: 'success',
                categories: state.categories.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case "DELETE_CATEGORY_SUCCESS":
            return {
                ...state,
                status: 'success',
                categories: state.categories.filter((item) => item.id !== action.payload),
            };

        default:
            return state;
    }
};
