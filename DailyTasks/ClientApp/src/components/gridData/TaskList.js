import React, { Component } from 'react';
import TaskRow from './TaskItem';
import Loading from '../control/Loading';

class TaskList extends Component {

    render() {
        const { listName, listStyle, tabSelected, showLoading } = this.props;
        
        const itemEle = this.props.items.map((row, index) => {
            let item = Object.assign({},{ ...row, index });
            return <TaskRow tabSelected={tabSelected} onEditItem={this.props.editItem} openConfirmModal={this.props.openConfirmModal} key={index} val={item} />
        });

        return (
            <div className="card">
                <div className="card-header">{listName}</div>
                <div className="card-body">
                    {showLoading ?
                        <Loading/> :
                        <table className="table table-hover">
                            <thead>
                            <tr className='table-secondary'>
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
                    }
                </div>
            </div>
        );
    }
}

export default TaskList;