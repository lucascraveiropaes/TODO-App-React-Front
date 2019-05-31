const initialState = {
    todos: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "CLEAR": {
            return {
                ...state,
                todos: []
            }
        }
        case "FETCH_TODOS": {
            return {
                ...state,
                todos: action.todos,
            }
        }
        case "NEW_TODO": {
            let todos = state.todos;
            const index = todos.push(action.todo) - 1;

            todos[index].id = action.id;

            return {
                ...state,
                todos,
            }
        }
        case "UPDATE_TODO": {
            let todos = state.todos;
            const index = state.todos.findIndex(el => el.id === action.todo.id);

            todos[index] = Object.assign({}, todos[index], action.todo);

            return {
                ...state,
                todos,
            }
        }
        case "DELETE_TODO": {
            const todos = state.todos.filter(el => el.id !== action.id);

            return {
                ...state,
                todos,
            }
        }
        default:
            return state;
    }
};
