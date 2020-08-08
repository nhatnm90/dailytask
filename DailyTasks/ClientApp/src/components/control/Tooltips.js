import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import Form from './Form';
import TaskList from "../gridData/TaskList";

class Tooltips extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.handleMouseIn = this.handleMouseIn.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseIn() {
        this.setState({ show: true });
    }

    handleMouseOut() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className='tooltip'
                 onMouseOver={this.handleMouseIn}
                 onMouseLeave={this.handleMouseOut}
            >
                {this.state.show &&
                <div className='tooltip-content top'>
                    {this.props.content}
                </div>
                }
                {this.props.children}
            </div>
        );
    }
}

export default Tooltips;