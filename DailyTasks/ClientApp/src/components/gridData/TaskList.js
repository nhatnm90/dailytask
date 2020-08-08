import React, { Component } from 'react';
import TaskRow from './TaskItem';
import Loading from '../control/Loading';

class TaskList extends Component {

    render() {
        const { listName, listStyle, tabSelected, showLoading } = this.props;
        
        const itemEle = this.props.items.map((row, index) => {
            let item = Object.assign({},{ ...row, index });
            return <TaskRow
                tabSelected={tabSelected}
                onEditItem={this.props.editItem}
                openConfirmModal={this.props.openConfirmModal}
                key={index}
                val={item} />
        });

        return (
            showLoading ?
                <Loading/> :
                <table className="table">
                    <thead>
                    <tr className='table-pink-1'>
                        <th scope="col">#</th>
                        <th scope="col">Task</th>
                        <th scope="col">Priority</th>
                        <th scope="col">At</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {itemEle}
                    </tbody>
                </table>
        );
    }
}

export default TaskList;