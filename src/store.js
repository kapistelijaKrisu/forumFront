import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dudeReducer from './reducers/dude'
import categoryReducer from'./reducers/category'
import forumpostReducer from'./reducers/forumposts'
import detailedForumpostReducer from'./reducers/detailedForumpost'
import notificationReducer from'./reducers/notification'
import interceptor from './services/interceptor'

const reducer = combineReducers({
    dude: dudeReducer,
    categories: categoryReducer,
    forumposts: forumpostReducer,
    detailedForumpost: detailedForumpostReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    applyMiddleware(interceptor, thunk)
    
)

export default store