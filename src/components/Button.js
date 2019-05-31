import React, { Component } from "react";

class Button extends Component {
    render() {
        const { className, onClick, children } = this.props;
        return (
            <div onClick={ onClick } className={ className + " fake-button" }>
                { children }
            </div>
        )
    }
}

export default Button
