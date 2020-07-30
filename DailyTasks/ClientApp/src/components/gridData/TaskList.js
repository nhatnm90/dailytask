import React, { Component } from 'react';
import TaskRow from './TaskItem';

class TaskList extends Component {

    render() {
        const itemEle = this.props.items.map((row, index) => {
            let item = Object.assign({},{ ...row, index });
            return <TaskRow onEditItem={this.props.editItem} openConfirmModal={this.props.openConfirmModal} key={index} val={item} />
        });
        const { listName, listStyle } = this.props;

        return (
            <div className={listStyle}>
                <div className="panel-heading">{listName}</div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemEle}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;