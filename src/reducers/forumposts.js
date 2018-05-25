import forumposterivce from '../services/forumpost'

const GET_FORUMPOSTS = 'GET_FORUMPOSTS'
const ADD_FORUMPOST = 'ADD_FORUMPOST'

const forumpostReducer = (store = [], action) => {
    switch (action.type) {
        case GET_FORUMPOSTS:
            return action.forumposts
        case ADD_FORUMPOST:
            return store.concat(action.forumpost)
        default:
            return store
    }
}

export const getForumpostsByCategory = (categoryid) => {
    return async (dispatch) => {
        const forumposts = await forumposterivce.getForumpostsByCategory(categoryid)
        dispatch({
            type: GET_FORUMPOSTS,
            forumposts
        })
    }
}

export const getForumpostsByDude = (dudeid) => {
    return async (dispatch) => {
        const forumposts = await forumposterivce.getForumpostsByDude(dudeid)
        dispatch({
            type: GET_FORUMPOSTS,
            forumposts
        })
    }
}

export const addForumpost = (forumpost) => {
    return async (dispatch) => {
        const response = await forumposterivce.postForumpost(forumpost)
        dispatch({
            type: ADD_FORUMPOST,
            forumpost: response
        })
    }
}

export default forumpostReducer