import { del, get, post, put } from "../util/request";

export const getQuestions = async () => {
    return await get("questions");
}

export const addQuestion = async (newQuestion) => {
    return await post("questions", newQuestion);
}

export const updateQuestion = async (currentQuestion) => {
    return await put(`questions/${currentQuestion.id}`, currentQuestion);
}

export const deleteQuestion = async (questionId) => {
    return await del(`questions/${questionId}`)
}