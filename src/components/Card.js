import React, { Component }     from "react";
import { connect }              from 'react-redux';
import { withToastManager }     from 'react-toast-notifications';
import Button                   from "./Button";
import { inverseColor }         from "../helpers/utils";
import { newTodo, updateTodo, deleteTodo }  from "../actions/todos";

const date = new Date();

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaved: true,
            title: props.title,
            description: props.description,
            backgroundColor: props.backgroundColor
        }
    }

    callback = (status, message) => {
        this.props.toastManager.add(message, {
            appearance: status ? "success" : "error"
        });
    }

    saveContent = (e) => {
        const { title, description, backgroundColor } = this.state;
        const { id, newTodo, updateTodo, toastManager } = this.props;

        e.preventDefault();
        this.setState({ isSaved: true });

        if (id === 0) {
            newTodo({ title, description, backgroundColor, id }, this.callback);
        } else {
            updateTodo({ title, description, backgroundColor, id }, this.callback);
        }
    };

    updateTitle = (e) => this.setState({ title: e.target.value, isSaved: false })
    updateDescription = (e) => this.setState({ description: e.target.value, isSaved: false });

    deleteTodo = () => {
        if (window.confirm("Deseja deletar essa tarefa?")) {
            this.props.deleteTodo(this.props.id, this.callback);
        }
    }

    render() {
        const { isSaved, title, description, backgroundColor } = this.state;
        const color = inverseColor(backgroundColor);

        return (
            <form className="card" autoComplete="false" style={{ backgroundColor: backgroundColor }} onSubmit={ this.saveContent }>
                {(!isSaved) ? (
                    <Button onClick={ this.saveContent } className="absolute-icon">
                        <i style={{ color: color }} className="material-icons">save</i>
                    </Button>
                ) : (
                    <Button onClick={ this.deleteTodo } className="absolute-icon">
                        <i style={{ color: color }} className="material-icons">delete</i>
                    </Button>
                )}
                <div className="card-input-group">
                    <input style={{ color: color }} type="text" name={ date.getTime() } value={ title } onChange={ this.updateTitle } placeholder="Insira um título aqui..."/>
                    <textarea style={{ color: color }} name={ date.getTime() } value={ description } onChange={ this.updateDescription } placeholder="Aqui você escreve mais detalhes sobre a tarefa..."/>
                </div>
            </form>
        )
    }
}

Card.defaultProps = {
    id: 0,
    title: "",
    description: "",
    backgroundColor: "#FFF"
};

const mapStateToProps = (state, props) => ({
    todos: state.todos.todos
})

export default connect(mapStateToProps, { newTodo, updateTodo, deleteTodo })( withToastManager(Card) );
