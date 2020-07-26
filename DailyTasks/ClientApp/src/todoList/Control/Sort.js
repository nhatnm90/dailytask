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
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by <span className="caret" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a href='/#' role="button" onClick={() => this.handleSort('taskName', 'asc')}>Name Asc</a></li>
                <li><a href='/#' role="button" onClick={() => this.handleSort('taskName', 'desc')}>Name Desc</a></li>
                <hr/>
                <li><a href='/#' role="button" onClick={() => this.handleSort('priority', 'asc')}>Level Asc</a></li>
                <li><a href='/#' role="button" onClick={() => this.handleSort('priority', 'desc')}>Level Desc</a></li>
              </ul>
              <span> </span>
              <span id="spSort" name="lbSortDesc" className="label label-success label-medium">{`${sortName.toLocaleUpperCase()} - ${sortDir.toUpperCase()}` }</span>
            </div>
          </div>
        );
    }
}

export default Sort;