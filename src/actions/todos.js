import request                  from "../helpers/request";

export const fetchTodos = (todos) => ({
    type: "FETCH_TODOS",
    todos: todos
});

export function newTodo(todo, callback = () => null) {
    delete todo.id;
    console.log( todo );

    return (dispatch) => {
        request({
            url: "/todos/new",
            method: "POST",
            data: todo
        }).then((data) => {
            if (data !== false) {
                dispatch({ type: "NEW_TODO", todo: todo, id: data.todo_new_id });
                callback(data.status, data.message);
            } else {
                callback(false, "Não foi possível adicionar a tarefa no momento");
            }
        }).catch((err) => {
            callback(false, "Não foi possível adicionar a tarefa no momento");
            console.log(err);
        });
    }
}

export function updateTodo(todo, callback) {
    const id = todo.id;
    delete todo.id;

    return (dispatch) => {
        request({
            url: "/todos/update/" + id,
            method: "PUT",
            data: todo
        }).then((data) => {
            if (data !== false) {
                dispatch({ type: "UPDATE_TODO", todo: todo, id: id });
                callback(data.status, data.message);
            } else {
                callback(data.status, data.message);
            }
        }).catch((err) => {
            callback(false, "Não foi possível atualizar a tarefa no momento");
            console.log(err);
        });
    }
}

export function deleteTodo(id, callback = () => null) {
    return (dispatch) => {
        request({
            url: "/todos/delete/" + id,
            method: "DELETE"
        }).then((data) => {
            if (data !== false) {
                dispatch({ type: "DELETE_TODO", id: id });
                callback(data.status, data.message);
            } else {
                callback(false, "Não foi possível deletar a tarefa no momento");
            }
        }).catch((err) => {
            callback(false, "Não foi possível deletar a tarefa no momento");
            console.log(err);
        });
    }
}

export const clearTodos = () => ({
    type: "CLEAR"
});
