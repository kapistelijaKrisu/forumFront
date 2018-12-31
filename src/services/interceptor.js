import { notify } from '../reducers/notification'

const crashReporter = () => next => async action => {
    try {
        return await next(action); // dispatch
    } catch (error) {
        if (error.response) {
            let msg = 'Unknown error!'
            switch (error.response.status) {
                case 500:
                    msg = serverShat()
                    break;
                case 400:
                    msg = badRequest(error.response.data.error)
                    break;
                case 404:
                    msg = notFound()
                    break;
                case 403:
                    msg = notAuthorized()
                    break;
                case 401: //bad credentials
                    msg = badRequest(error.response.data.error)
                    break;
                default:
                    break;
            }
            await next(notify(msg))
            throw error; // re-throw error
        }
    }
}

const badRequest = (errResponse) => {
    const isArr = Array.isArray(errResponse)
    let msg = '';
    if (isArr) {
        errResponse.forEach(element => {
            msg += element + ' '
        });
    } else {
        msg = errResponse;
    }
    return msg
}

const serverShat = () => {
    return 'Server shat!'
}

const notFound = () => {
    return 'Not found!'
}

const notAuthorized = () => {
    return 'Not fo u'
}


export default crashReporter;
