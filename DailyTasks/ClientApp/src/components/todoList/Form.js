import _ from 'lodash';
import React, { Component } from 'react';
import { get, isEmpty, parseInt } from 'lodash';
const uuidv4 = require('uuid/v4')

class Form extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            taskName: '',
            priority: 0
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const id = get(this.props, 'itemSelected.id', '');
        if (!isEmpty(id)) {
            const { taskName, priority } = get(this.props, 'itemSelected', {});
            this.setState({
                id, taskName, priority
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            const id = _.get(nextProps, 'itemSelected.id');
            const { itemSelected: { taskName, level } } = nextProps;
            this.setState({
                id, taskName, level
            });
        }
    }

    handleSubmit(event) {
        const { id, taskName, priority } = this.state;
        if (isEmpty(id)) {
            this.props.onAddTask({ taskName, priority: parseInt(priority), id: uuidv4()});
        } else {
            this.props.onEditTask({ taskName, priority: parseInt(priority), id});
        }
        event.preventDefault();
    }

    handleCancel() {
        this.setState({
            id: '',
            taskName: '',
            priority: 0
        });
        this.props.onClickCancel();
    }

    handleInputChange(event) {
        const { target: { name, value } } = event;
        // const value = target.name === 'isGoing' ? target.checked : target.value;
    
        this.setState({
          [name]: value
        });
    }

    render() {
        const { taskName, priority } = this.state;
        return (
            <div className="row">
                <div className="col-md-offset-7 col-md-5">					
                  <form  onSubmit={this.handleSubmit} className="form-inline">
                    <div className="form-group">
                      {/* <label className="sr-only" htmlFor>label</label> */}
                      <input id="txtTaskName" name="taskName" type="text" className="form-control" placeholder="Task name" value={taskName} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <select  placeholder="Task priority" name="priority" value={parseInt(priority)} id="input" className="form-control" required="required" onChange={this.handleInputChange}>
                            <option value={0}>Low</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                        </select>
                    </div>
                    <button id="btnSubmitTask" type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={this.handleCancel} type="button" className="btn btn-danger">Cancel</button>
                  </form>
                </div>
              </div>
        );
    }
}

export default Form;