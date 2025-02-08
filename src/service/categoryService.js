import { del, get, post, put } from "../util/request";

export const getListCategoryService = async () => {
    return await get("categories");
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