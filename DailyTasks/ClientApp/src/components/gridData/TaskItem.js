import React, { Component } from 'react';
import moment from 'moment';

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

    generateLevelIcon(priority){
        if ((priority) === 0) {
            return (<span className="label level-pink"><i className="fas fa-arrow-down" aria-hidden="true" /></span>);
        } else if (priority === 1) {
            return (<span className="label level-pink"><i className="fas fa-align-justify" aria-hidden="true" /></span>);
        } else {
            return (<span className="label level-pink"><i className="fas fa-arrow-up" aria-hidden="true" /></span>);
        }
    }

    render() {
        const { val: { index, taskName, priority, id, createdAt }, tabSelected } = this.props;
        let actionControl = null;
        if (tabSelected === 0) {
            actionControl = (<div>
                <button type="button" className="btn btn-pink-1" onClick={() => this.props.onEditItem({ ...this.props.val })}>
                    <i className="fas fa-pen-square"/>
                </button>
                <span> </span>
                <button type="button" className="btn btn-pink-1" onClick={() => this.props.openConfirmModal({ id, taskName })}>
                    <i className="far fa-check-square" />
                </button>
            </div>);
        } else {
            actionControl = (
                <button type="button" className="btn btn-pink-1" onClick={() => this.props.openConfirmModal({ id, taskName})}>
                    <i className="far fa-trash-alt"/>
                </button>);
        }
        const rowId = `tr_${id}`;
        return (
            <tr id={rowId}>
                <th scope="row">{index + 1}</th>    
                <td>{taskName}</td>
                <td>{this.generateLevelIcon(priority)}</td>
                <td>{moment(createdAt).format('MMM DD HH:mm')}</td>
                <td>
                    {actionControl}
                </td>
            </tr>
        );
    }
}

export default TaskItem;