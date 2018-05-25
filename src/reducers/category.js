import categorySerivce from '../services/category'

const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

const categoryReducer = (store = [], action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories
        case ADD_CATEGORY:
            return store.concat(action.category)
        default:
            return store
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        const categories = await categorySerivce.getAllCategories()
        dispatch({
            type: GET_CATEGORIES,
            categories
        })
    }
}

export const addCategory = (category) => {
    return async (dispatch) => {
        const response = await categorySerivce.postCategory(category)
        dispatch({
            type: ADD_CATEGORY,
            category: response
        })
    }
}

export default categoryReducer