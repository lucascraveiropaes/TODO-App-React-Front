import React, { Component } from "react";
import ReactCardFlip        from 'react-card-flip';
import { Button, Card }     from "../components";

class NewTodoCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            add: false,
        }
    }

    setAdd = () => this.setState({ add: true });

    render() {
        const { add } = this.state;

        return (
            <div className="col-md-3">
                <ReactCardFlip isFlipped={ add } flipDirection="horizontal">
                    <Button className="card" onClick={ this.setAdd } key="front">
                        <div className="card-add-new">
                            <i class="material-icons">add</i>
                        </div>
                    </Button>
                    <Card key="back"/>
                </ReactCardFlip>
            </div>
        )
    }
}

export default NewTodoCard
