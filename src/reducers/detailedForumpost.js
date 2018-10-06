import forumpostservice from '../services/forumpost'

const GET_FORUMPOST = 'GET_DETAILED_FORUMPOST'
const ADD_COMMENT = 'ADD_COMMENT'

const commentsReducer = (store = { comments: [] }, action) => {
    switch (action.type) {
        case GET_FORUMPOST:
            return action.forumpost
        case ADD_COMMENT:
            const newStore = Object.assign({},store)
            newStore.comments.push(action.comment)
            return newStore
        default:
            return store
    }
}

export const getDetailedForumPost = (forumpost_id) => {
    return async (dispatch) => {
        const forumpost = await forumpostservice.getDetailedForumpost(forumpost_id)
        dispatch({
            type: GET_FORUMPOST,
            forumpost
        })
    }
}

export const addComment = (comment) => {
    return async (dispatch) => {
        const response = await forumpostservice.postComment(comment)
        dispatch({
            type: ADD_COMMENT,
            comment: response
        })
    }
}

export default commentsReducer