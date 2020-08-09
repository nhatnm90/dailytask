import _ from 'lodash';
import React, { Component } from 'react';
import { get, isEmpty, parseInt } from 'lodash';
import {Button, Modal} from "react-bootstrap";
const uuidv4 = require('uuid/v4')

class Form extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            taskName: '',
            priority: 0,
            comment: ''
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const id = get(this.props, 'itemSelected.id', '');
        if (!isEmpty(id)) {
            const { taskName, priority, comment } = get(this.props, 'itemSelected', {});
            this.setState({
                id, taskName, priority, comment
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            const id = _.get(nextProps, 'itemSelected.id');
            const { itemSelected: { taskName, priority, comment } } = nextProps;
            this.setState({
                id, taskName, priority, comment
            });
        }
    }

    handleSubmit(event) {
        this.props.onHandleSubmit();
        const { id, taskName, priority, comment } = this.state;
        if (isEmpty(id)) {
            this.props.onAddTask({ taskName, priority: parseInt(priority), id: uuidv4(), comment });
        } else {
            this.props.onEditTask({ taskName, priority: parseInt(priority), id, comment });
        }
        event.preventDefault();
    }

    handleCancel() {
        this.setState({
            id: '',
            taskName: '',
            priority: 0,
            comment: ''
        });
        this.props.onClickCancel();
    }

    handleInputChange(event) {
        const { target: { name, value } } = event;
        this.setState({
          [name]: value
        });
    }

    render() {
        const { taskName, priority, comment } = this.state;
        const isEnable = this.props.tabSelected === 0;
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="txtTaskName">Task name</label>
                    <input disabled={!isEnable}  id="txtTaskName" name="taskName" type="text" className="form-control" value={taskName} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="ddlPriority">Priority</label>
                    <select disabled={!isEnable} id='ddlPriority' name="priority" value={parseInt(priority)} className="form-control" required="required" onChange={this.handleInputChange}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="textAreaComment">Comment</label>
                    <textarea disabled={!isEnable}  name="comment" className="form-control" id="textAreaComment" rows={4} onChange={this.handleInputChange} value={comment} />
                </div>
            </form>
        );
    }
}

export default Form;