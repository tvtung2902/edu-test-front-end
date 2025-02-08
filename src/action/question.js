import { addQuestionService, deleteQuestionService, getListQuestionService, updateQuestionService } from '../service/questionService'

export const fetchDataQuestion = () => {
    return async (dispatch) => {
        dispatch({ type: "FETCH_DATA_QUESTION_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 
            const result = await getListQuestionService();
            const questions = result.response;
            dispatch({ type: "FETCH_DATA_QUESTION_SUCCESS", payload: questions })
        } catch (error) {
            dispatch({ type: "FETCH_DATA_QUESTION_FAILURE", payload: "error" })
        }
    }
}

export const addQuestion = (newQuestion, newQuestionFormData) => {
    return async (dispatch) => {
        
        dispatch({ type: "ADD_QUESTION_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 

            const result = await addQuestionService(newQuestionFormData);
            dispatch({ type: "ADD_QUESTION_SUCCESS", payload: { id: result.response, ...newQuestion } })
        } catch (error) {
            dispatch({ type: "ADD_QUESTION_FAILURE", payload: "error" });
        }
    }
}

export const updateQuestion = (currentQuestion) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_QUESTION_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 

            const response = await updateQuestionService(currentQuestion);
            dispatch({ type: "UPDATE_QUESTION_SUCCESS", payload: currentQuestion })
        } catch (error) {
            dispatch({ type: "UPDATE_QUESTION_FAILURE", payload: "error" });
        }
    }
}

export const deleteQuestion = (questionId) => {
    return async (dispatch) => {
        dispatch({ type: "DELETE_QUESTION_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 
            const result = await deleteQuestionService(questionId);
            dispatch({ type: "DELETE_QUESTION_SUCCESS", payload: questionId })
        } catch (error) {
            dispatch({ type: "DELETE_QUESTION_FAILURE", payload: "error" });
        }
    }
}