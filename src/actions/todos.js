export const fetchTodos = (todos) => ({
    type: "FETCH_TODOS",
    todos: todos
})

export const clearTodos = () => ({
    type: "CLEAR"
})
