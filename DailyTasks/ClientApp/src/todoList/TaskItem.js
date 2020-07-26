import React, { Component } from 'react';

class TaskItem extends Component {

    generateLevel(priority){
        if ((priority) === 0) {
            return (<span className="label label-info">Low</span>);
        } else if (priority === 1) {
            return (<span className="label label-default">Medium</span>);
        } else {
            return (<span className="label label-danger">High</span>);
        }
    }

    render() {
        const { val: { index, taskName, priority, id } } = this.props;
        const rowId = `tr_${id}`;
        return (
            <tr id={rowId}>
                <th scope="row">{index + 1}</th>    
                <td>{taskName}</td>
                <td>{this.generateLevel(priority)}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={() => this.props.onEditItem({ id, taskName, priority})}>Edit</button>
                    <span> </span>
                    <button type="button" className="btn btn-success" onClick={() => this.props.openConfirmModal({ id, taskName})}>Mark as done</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;