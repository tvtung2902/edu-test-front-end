const initialState = {
    dataOfPage: null,
    status: 'INIT',
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORY_REQUEST":
            return {
                ...state,
                status: 'GET_LOADING',
                error: null,
            };
        case "ADD_CATEGORY_REQUEST":
            return {
                ...state,
                status: 'ADD_LOADING',
                error: null,
            };
        case "UPDATE_CATEGORY_REQUEST":
            return {
                ...state,
                status: 'UPDATE_LOADING',
                error: null,
            };
        case "DELETE_CATEGORY_REQUEST":
            return {
                ...state,
                status: 'DELETE_LOADING',
                error: null,
            };

        case "FETCH_CATEGORY_SUCCESS":    
            return {
                ...state,
                dataOfPage: {...action.payload},
                status: 'GET_SUCCESS',
            };

        case "FETCH_CATEGORY_FAILURE":
            return {
                ...state,
                dataOfPage: {...action.payload},
                status: 'GET_FAILURE',
            };
        case "ADD_CATEGORY_FAILURE":
            return {
                ...state,
                status: 'ADD_FAILURE',
                error: action.payload,
            };
        case "UPDATE_CATEGORY_FAILURE":
            return {
                ...state,
                status: 'UPDATE_FAILURE',
                error: action.payload,
            };
        case "DELETE_CATEGORY_FAILURE":
            return {
                ...state,
                status: 'DELETE_FAILURE',
                error: action.payload,
            };

        case "ADD_CATEGORY_SUCCESS":
            return {
                ...state,
                status: 'ADD_SUCCESS'
            };

        case "UPDATE_CATEGORY_SUCCESS":
            return {
                ...state,
                status: 'UPDATE_SUCCESS',
                categories: state.categories.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case "DELETE_CATEGORY_SUCCESS":
            return {
                ...state,
                status: 'DELETE_SUCCESS'
            };

        default:
            return state;
    }
};
