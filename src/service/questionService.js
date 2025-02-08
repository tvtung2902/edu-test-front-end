import { del, get, postFormData, put } from "../util/request";

export const getListQuestionService = async () => {
    return await get("questions");
}

export const addQuestionService = async (newQuestionFormData) => {
    return await postFormData("questions", newQuestionFormData);
}

export const updateQuestionService = async (currentQuestion) => {
    return await put(`questions/${currentQuestion.id}`, currentQuestion);
}

export const deleteQuestionService = async (questionId) => {
    return await del(`questions/${questionId}`)
}