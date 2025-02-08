import { 
    addCategoryService, 
    deleteCategoryService, 
    getListCategoryService, 
    updateCategoryService 
} from '../service/categoryService';

export const fetchDataCategory = () => {
    return async (dispatch) => {
        dispatch({ type: "FETCH_CATEGORY_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 

            const result = await getListCategoryService();
            const categories = result.response;

            dispatch({ type: "FETCH_CATEGORY_SUCCESS", payload: categories });
        } catch (error) {
            dispatch({ type: "FETCH_CATEGORY_FAILURE", payload: "error" });
        }
    };
};

export const addCategory = (newCategory) => {
    return async (dispatch) => {
        dispatch({ type: "ADD_CATEGORY_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 

            const result = await addCategoryService(newCategory);
            dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: { id: result.response, ...newCategory } });
        } catch (error) {
            dispatch({ type: "ADD_CATEGORY_FAILURE", payload: "error" });
        }
    };
};

export const updateCategory = (currentCategory) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_CATEGORY_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 

            await updateCategoryService(currentCategory);
            dispatch({ type: "UPDATE_CATEGORY_SUCCESS", payload: currentCategory });
        } catch (error) {
            dispatch({ type: "UPDATE_CATEGORY_FAILURE", payload: "error" });
        }
    };
};

export const deleteCategory = (categoryId) => {
    return async (dispatch) => {
        dispatch({ type: "DELETE_CATEGORY_REQUEST" });
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 
 
            await deleteCategoryService(categoryId);
            dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: categoryId });
        } catch (error) {
            dispatch({ type: "DELETE_CATEGORY_FAILURE", payload: "error" });
        }
    };
};