import forumpostservice from '../services/forumpost'

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
            const editedComment = Object.assign({}, store.comments.find(c => (c.comment_id === action.comment.comment_id)))
            editedComment.content = action.forumpost.content
            editedComment.edited = action.forumpost.edited
            editedComment.deleted = action.forumpost.deleted

            const editedStore = Object.assign({}, store)
            editedStore.comments = store.comments.filter(c => (c.comment_id !== action.comment.comment_id))
            editedStore.comments.push(editedComment)
            editedStore.comments.sort( (a, b) => (a.posttime < b.posttime))
            return editedStore
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
    console.log('edit')
    return async (dispatch) => {
        console.log('nnn')
        const response = await forumpostservice.editComment(comment)
        console.log(response)
        dispatch({
            type: EDIT_COMMENT,
            comment: response
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