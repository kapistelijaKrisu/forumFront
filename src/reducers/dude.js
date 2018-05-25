import loginService from '../services/dude'

const initialState = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedDude')
    if (loggedUserJSON) {
      const dude = JSON.parse(loggedUserJSON)
      loginService.setToken(dude.token)
      return dude.loginToken
    }
    return null
}

const SET_DUDE = 'SET_DUDE'
const LOCAL_STORAGE_DUDE = 'loggedDude'

const dudeReducer = (store = initialState(), action) => {
    switch (action.type) {
        case 'SET_DUDE':
            return action.dude
        default:
            return store
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const dude = await loginService.login({
            username: username,
            password: password
        })
        window.localStorage.setItem(LOCAL_STORAGE_DUDE, JSON.stringify(dude))
        loginService.setToken(dude.token)
        dispatch({
            type: SET_DUDE,
            dude:dude.loginToken
        })
    }
}

export const register = (username, password) => {
    return async (dispatch) => {
        const dude = await loginService.register({
            username: username,
            password: password
        })
        window.localStorage.setItem(LOCAL_STORAGE_DUDE, JSON.stringify(dude))
        loginService.setToken(dude.token)
        dispatch({
            type: SET_DUDE,
            dude:dude.loginToken
        })
    }
}

export const logout = (username, password) => {
    return async (dispatch) => {
        window.localStorage.removeItem(LOCAL_STORAGE_DUDE)
        loginService.setToken(null)
        dispatch({
            type: SET_DUDE,
            dude: null
        })
    }
}
export default dudeReducer