import React, { Component } from 'react'

import '../../theme/button.scss'

class Button extends Component {
    render() {
        return (
            <button 
                className='button'
                onClick={this.props.action}
                type='button'
                disabled={this.props.disabled}
            >
                {this.props.text}
            </button>
        )
    }
}

export default Button