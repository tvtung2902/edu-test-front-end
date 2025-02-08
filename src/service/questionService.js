import { del, get, postFormData, put } from "../util/request";

export const getQuestions = async () => {
    return await get("questions");
}

export const addQuestion = async (newQuestionFormData) => {
    return await postFormData("questions", newQuestionFormData);
}

export const updateQuestion = async (currentQuestion) => {
    return await put(`questions/${currentQuestion.id}`, currentQuestion);
}

export const deleteQuestion = async (questionId) => {
    return await del(`questions/${questionId}`)
}