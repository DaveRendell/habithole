import React, { Component } from 'react'

import '../../theme/button.scss'

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({loading: true})
        this.props.action()
    }

    render() {
        return (
            <button 
                className='button'
                onClick={this.onClick}
                type='button'
                disabled={this.props.disabled}
            >
                {
                    this.state.loading
                        ? this.props.loadingText || this.props.text
                        : this.props.text
                }
            </button>
        )
    }
}

export default Button