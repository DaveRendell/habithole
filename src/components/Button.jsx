import React, { Component } from 'react'

class Button extends Component {
    getButtonStyleClass() {
        switch (this.props.style) {
            case 'primary': return '-primary'
            case 'success': return '-success'
            default: return ''
        }
    }

    render() {
        return (
            <button 
                className={`auth-button btn btn-outline${this.getButtonStyleClass()}`}
                onClick={this.props.action}
                type='button'
            >
                {this.props.text}
            </button>
        )
    }
}

export default Button