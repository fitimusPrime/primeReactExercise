import 'whatwg-fetch'
import { API_URL } from 'Constants'

const callApi = ({ endpoint, options: optionsFromCall = {} }, store) => {
    const url = API_URL + endpoint
    console.log(`callig API: ${url}`)
    let options = {
        // default params
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client,
        ...optionsFromCall
    }
    // let session = store.getState().session
    // Override headers to include Authorization
    // if (session) {
    //     options = {
    //         ...options,
    //         headers: {
    //             ...options.headers,
    //             'Authorization': `${session.tokenType} ${session.accessToken}`
    //         }
    //     }
    // }
    return fetch(url, options)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response
            }
            // if (response.status === 401) {
            //     store.dispatch({ type: "CLEAR_SESSION" })
            // }
            const error = {
                status: response.status,
                message: response.statusText
            }
            console.log(`Error at ${url}`, error)
            throw error
        }).then(response => {
            return response.json()
        }).then(json => {
            console.log(`Success at ${url}`, json)
            return json
        })
}


export const CALL_API = Symbol('Call API')

/**
 * Intercepts CALL_API actions to perform the call to the API server
 */
export default store => next => action => {
    const call = action[CALL_API]
    // Only apply this middleware if we are calling an API
    if (typeof call === 'undefined') {
        return next(action)
    }
    return callApi(call, store)
}