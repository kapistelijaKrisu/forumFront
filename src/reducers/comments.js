import commentserivce from '../services/comment'

const GET_COMMENTS = 'GET_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'

const commentsReducer = (store = [], action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.comments
        case ADD_COMMENT:
            return store.concat(action.comment)
        default:
            return store
    }
}

export const getComments = (forumpostid) => {
    return async (dispatch) => {
        const comments = await commentserivce.getCommentsByForumPost(forumpostid)
        dispatch({
            type: GET_COMMENTS,
            comments
        })
    }
}

export const addComment = (comment) => {
    return async (dispatch) => {
        const response = await commentserivce.postComment(comment)
        dispatch({
            type: ADD_COMMENT,
            comment: response
        })
    }
}

export default commentsReducer