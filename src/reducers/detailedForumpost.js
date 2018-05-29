import forumpostservice from '../services/forumpost'

const GET_FORUMPOST = 'GET_DETAILED_FORUMPOST'
const ADD_COMMENT = 'ADD_COMMENT'

const commentsReducer = (store = { comments: [] }, action) => {
    switch (action.type) {
        case GET_FORUMPOST:
            return action.forumpost
        case ADD_COMMENT:
        console.log('cur', store)
            const newStore = Object.assign({
                store,
                comments: store.comments.concat(action.comment)
            });
            return newStore
        default:
            return store
    }
}

export const getDetailedForumPost = (forumpostid) => {
    return async (dispatch) => {
        const forumpost = await forumpostservice.getDetailedForumpost(forumpostid)
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