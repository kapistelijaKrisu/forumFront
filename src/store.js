import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dudeReducer from './reducers/dude'
import categoryReducer from'./reducers/category'
import forumpostReducer from'./reducers/forumposts'
import commentsReducer from'./reducers/comments'
import notificationReducer from'./reducers/notification'

const reducer = combineReducers({
    dude: dudeReducer,
    categories: categoryReducer,
    forumposts: forumpostReducer,
    comments: commentsReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store