import forumpostservice from '../services/forumpost'
import clone from 'clone'

const GET_FORUMPOST = 'GET_DETAILED_FORUMPOST'
const ADD_COMMENT = 'ADD_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'
const EDIT_FORUMPOST = 'EDIT_FORUMPOST'

const commentsReducer = (store = { comments: [] }, action) => {
    switch (action.type) {
        case GET_FORUMPOST:
            return action.forumpost
        case EDIT_FORUMPOST:
            const edited = Object.assign({}, store)
            edited.title = action.forumpost.title
            edited.category_id = action.forumpost.category_id
            edited.disabled = action.forumpost.disabled
            return edited
        case EDIT_COMMENT:
        let copy = clone(store)
            copy.comments = copy.comments.map((item, index) => {
                if (item.comment_id !== action.comment.comment_id) { return item }
                let c  = Object.assign({}, item)
                c.content = action.comment.content
                c.edited = action.comment.edited
                c.deleted = action.comment.deleted
                return c;
            })
            return copy
        case ADD_COMMENT:
            const newStore = Object.assign({}, store)
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

export const editComment = (comment) => {
    return async (dispatch) => {
        const editedComment = await forumpostservice.editComment(comment)
        dispatch({
            type: EDIT_COMMENT,
            comment: editedComment
        })
    }
}

export const editForumPost = (post, lock) => {
    const body = {
        forumpost_id: post.forumpost_id,
        title: post.title,
        category_id: post.category_id,
        disabled: lock,
    }
    return async (dispatch) => {
        const forumpost = await forumpostservice.putForumpost(body)
        dispatch({
            type: EDIT_FORUMPOST,
            forumpost
        })
    }
}

export default commentsReducer