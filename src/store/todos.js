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
        default:
            return state;
    }
};
