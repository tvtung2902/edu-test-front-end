import { del, get, post, put } from "../util/request";

export const getListCategoryService = async (pageNo, pageSize, searchName) => {
    return await get(`categories?page-no=${pageNo}&page-size=${pageSize}&name=${searchName}`);
}

export const addCategoryService = async (newcategoryFormData) => {
    return await post("categories", newcategoryFormData);
}

export const updateCategoryService = async (currentcategory) => {
    return await put(`categories/${currentcategory.id}`, currentcategory);
}

export const deleteCategoryService = async (categoryId) => {
    return await del(`categories/${categoryId}`)
}