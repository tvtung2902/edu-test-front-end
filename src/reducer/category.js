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
    status: 'loading',
    error: null,
};

