import categorySerivce from '../services/category'

const GET_CATEGORIES = 'GET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

const categoryReducer = (store = [], action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return action.categories
        case ADD_CATEGORY:
            let newStore = store.concat(action.category)
            newStore.sort(sortByName)
               
            return newStore
        default:
            return store
    }
}

const sortByName = (category1, category2) => {
   return category1.name.toLowerCase() > category2.name.toLowerCase()
}

export const getCategories = () => {
    return async (dispatch) => {
        const categories = await categorySerivce.getAllCategories()
        console.log(categories)
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