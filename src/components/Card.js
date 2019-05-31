import React, { Component } from "react";
import Button               from "./Button";
import { inverseColor }     from "../helpers/utils";

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

    saveContent = (e) => {
        e.preventDefault();
        this.setState({ isSaved: true })
    };

    updateTitle = (e) => this.setState({ title: e.target.value, isSaved: false })
    updateDescription = (e) => this.setState({ description: e.target.value, isSaved: false })

    render() {
        const { isSaved, title, description, backgroundColor } = this.state;
        const color = inverseColor(backgroundColor);

        return (
            <form className="card" autoComplete="false" style={{ backgroundColor: backgroundColor }} onSubmit={ this.saveContent }>
                {(!isSaved) && (
                    <Button onClick={ this.saveContent } className="absolute-icon">
                        <i style={{ color: color }} className="material-icons">save</i>
                    </Button>
                )}
                <div className="card-input-group">
                    <input style={{ color: color }} type="text" name={ date.getTime() } value={ title } onChange={ this.updateTitle } placeholder="Insira um título aqui..."/>
                    <textarea style={{ color: color }} rows="5" name={ date.getTime() } value={ description } onChange={ this.updateDescription } placeholder="Aqui você escreve mais detalhes sobre a tarefa..."/>
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

export default Card
