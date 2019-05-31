import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Language': 'pt-BR,pt;q=0.5'
    }
});

const request = function(options) {
    const onSuccess = (typeof options.onSuccess !== "undefined") ? options.onSuccess :
        (response) => {
        console.debug(response);
        return response.data;
    }
    const onError = (typeof options.onError !== "undefined") ? options.onError :
        (error) => {
        console.debug(error);
        return false;
    }

    return client(options).then(onSuccess).catch(options.onError);
}

export default request;
