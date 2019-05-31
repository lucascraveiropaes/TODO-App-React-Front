import React, { Component }     from "react";
import { connect }              from 'react-redux';
import { Card, NewTodoCard }    from "../components/";
import request                  from "../helpers/request";
import { fetchTodos }           from "../actions/todos";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    failToast = () => {
        this.props.toastManager.add("Não foi possível atualizar sua lista de tarefas. Você está trabalhando offline.", {
            appearance: "error",
            placement: "bottom-right"
        });
    }

    componentWillReceiveNewProps(nextProps) {
        console.log( nextProps, false );
        this.setState({ add: false })
    }

    componentDidMount() {
        const { toastManager } = this.props;

        request("/todos", {
            method: "GET"
        }).then((data) => {
            if (data !== false) {
                this.props.fetchTodos(data.todos);
                toastManager.add("Dados atualizados com sucesso!", { appearance: "success" });
            } else this.failToast();
        }).catch((err) => this.failToast());
    }

    renderTodo = (todo, index) => (
        <div className="col-md-3" key={`${index}_${todo.id}`}>
            <Card
                id={ todo.id }
                title={ todo.title }
                description={ todo.description }
                backgroundColor={ todo.backgroundColor }
            />
        </div>
    )

    render() {
        const { todos } = this.props;

        return (
            <div className="app-container">
                <div className="container-fluid">
                    <div className="row">
                        { todos.map(this.renderTodo) }
                        <NewTodoCard key={ new Date().getTime() }/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    todos: state.todos.todos
})

export default connect(mapStateToProps, { fetchTodos })(Home);
