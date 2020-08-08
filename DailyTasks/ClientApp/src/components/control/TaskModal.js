import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import Form from './Form';
import TaskList from "../gridData/TaskList";

class TaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            taskName: '',
            priority: 0
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        console.log(`CLOSED!!!`);
    }
    render() {
        return (
            <Modal
            backdrop='static'
            show={this.props.show}
            animation={false}
            onHide={this.props.onClickCancel}
            size="md"
            aria-labelledby="contained-modal-title-center"
            centered
            backdropClassName='modalCustom'
            >
                <Modal.Header closeButton={this.props.onClickCancel}>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        itemSelected={this.props.itemSelected}
                        onAddTask={this.props.onAddTask}
                        onEditTask={this.props.onEditTask}
                        onCancelTask={this.props.onClickCancel}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

export default TaskModal;