import { getQuestions as fetchQuestions, addQuestion as createQuestion, updateQuestion as modifyQuestion, deleteQuestion as delQuestion } from '../service/questionService'
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
} from './actionType'

export const fetchDataQuestion = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_DATA_REQUEST });
        try {
            // await new Promise(resolve => setTimeout(resolve, 2000)); 
            const result = await fetchQuestions();
            const questions = result.response;
            dispatch({ type: FETCH_DATA_SUCCESS, payload: questions })
        } catch (error) {
            dispatch({ type: FETCH_DATA_FAILURE, payload: "error" })
        }
    }
}

export const addQuestion = (newQuestion, newQuestionFormData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_REQUEST });
        try {
            const result = await createQuestion(newQuestionFormData);
            dispatch({ type: ADD_SUCCESS, payload: { id: result.response, ...newQuestion } })
        } catch (error) {
            dispatch({ type: ADD_FAILURE, payload: "error" });
        }
    }
}

export const updateQuestion = (currentQuestion) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_REQUEST });
        try {
            const response = await modifyQuestion(currentQuestion);
            dispatch({ type: UPDATE_SUCCESS, payload: currentQuestion })
        } catch (error) {
            dispatch({ type: UPDATE_FAILURE, payload: "error" });
        }
    }
}

export const deleteQuestion = (questionId) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_REQUEST });
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            const result = await delQuestion(questionId);
            dispatch({ type: DELETE_SUCCESS, payload: questionId })
        } catch (error) {
            dispatch({ type: DELETE_FAILURE, payload: "error" });
        }
    }
}