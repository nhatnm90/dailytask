import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortName: 'priority',
            sortDir: 'desc'
        };
        this.handleSort = this.handleSort.bind(this);
    } 

    handleSort(sortName, sortDir){
        this.setState({
            sortName, sortDir
        });
        this.props.onClickSort(sortName, sortDir);
    }

    render() {
        const { sortName, sortDir } = this.state;
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 input-group mb-4">
                <div className="input-group-prepend">
                    <button type="button" className="btn btn-pink-1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort by 
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href='/#' role="button" onClick={() => this.handleSort('taskName', 'asc')}>TaskName Asc</a>
                        <a className="dropdown-item" href='/#' role="button" onClick={() => this.handleSort('taskName', 'desc')}>TaskName Desc</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href='/#' role="button" onClick={() => this.handleSort('priority', 'asc')}>Priority Asc</a>
                        <a className="dropdown-item" href='/#' role="button" onClick={() => this.handleSort('priority', 'desc')}>Priority Desc</a>
                    </div>
                </div>
                <input id="spSort" value={`${sortName.toLocaleUpperCase()} - ${sortDir.toUpperCase()}` } name="lbSortDesc" readOnly type="text" className="form-control" aria-label="Text input with dropdown button" />
            </div>
        );
    }
}

export default Sort;