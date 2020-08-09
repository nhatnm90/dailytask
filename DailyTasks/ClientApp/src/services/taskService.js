import { environment } from '../environment';

export const taskService = {
    getAll,
    getById,
    insert,
    update,
    delete: _delete,
    getArchive,
    archive
};

function getAll() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${environment.API_URL}/task`, requestOptions).then(handleResponse);
}

function getArchive() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${environment.API_URL}/task/archive`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${environment.API_URL}/task/${id}`, requestOptions).then(handleResponse);
}

function archive(id) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${environment.API_URL}/task/${id}/archive`, requestOptions).then(handleResponse);
}

function insert(task) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    };
    return fetch(`${environment.API_URL}/task`, requestOptions).then(handleResponse);
}

function update(task) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    };
    return fetch(`${environment.API_URL}/task/${task.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(`${environment.API_URL}/task/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}