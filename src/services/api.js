const defHeaders = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
};

function validateResponse(response){
    if (!response.ok){
        throw new Error(response.statusText)
    }

    return response;
}

/**
 * default request
 *
 * @param url
 * @param headers
 * @returns {Promise<Response>}
 */
export const fetchRequest = (url = '', headers = defHeaders) => fetch(url, headers);

/**
 * Get all users
 * @returns {Promise<{ok} | never>}
 */
export const fetchAllUsers = () => fetchRequest('https://hr.oat.taocloud.org/v1/users?limit=100&offset=0')
    .then(validateResponse)
    .then(response => response.text())
    .catch(error => {
       throw new Error(error)
    });


