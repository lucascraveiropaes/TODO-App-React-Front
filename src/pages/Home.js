import React, { Component }     from "react";
import { Card, NewTodoCard }    from "../components/";
import request                  from "../helpers/request";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [{
                id: 1,
                title: "Teste",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                backgroundColor: "#286e38"
            }]
        }
    }

    componentDidMount() {
        request("/todos", {
            method: "GET"
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
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
        const { todos } = this.state;

        return (
            <div className="app-container">
                <div className="container-fluid">
                    <div className="row">
                        { todos.map(this.renderTodo) }
                        <NewTodoCard/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
