const defaultFetch = (url, options) => fetch(url, options)
    .then(async (response) => {
        const { status } = response;
        const data = await response.json()
        return { data, status };
    })
    .catch((error) => ({ error }));

const get = ({ url }) => {
    const options = {
        method: 'GET',
    }
    return defaultFetch(url, options);
}

const post = ({ url, body }) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
    return defaultFetch(url, options);
}

const put = ({ url, body }) => {
    const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
    return defaultFetch(url, options);
}


export default {
    get, post, put,
}