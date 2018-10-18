/*import axios from 'axios'

const installInterceptor = (store) => {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
    }, function (error) {
        // Do something with response error
        console.log(store.getState())
    
        console.log(error.response)
        console.log(error.response.data)
        return Promise.reject(error);

        
    });
    
}
*/

import {notify} from'../reducers/notification'

const crashReporter = () => next => async action => {
    try {
      return await next(action); // dispatch
    } catch (error) {
        
        const errors = error.response.data.error
        const isArr = Array.isArray(errors)
        let msg = '';
        if (isArr){
            errors.forEach(element => {
                msg += element + ' '
            });
        } else {
            msg = errors;
        }
        await next(notify(msg))
      throw error; // re-throw error
    }
}

export default crashReporter;
