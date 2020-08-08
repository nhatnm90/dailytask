import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'

class Control extends Component {

    constructor(props) {
        super(props);

        this.handleToogle = this.handleToogle.bind(this);
        this.generateAddButton = this.generateAddButton.bind(this);
    }

    handleToogle() {
        this.props.onClick();
    }

    generateAddButton() {
        if (this.props.isShowAddForm) {
            return (<button type="button" className="btn btn-default btn-block" onClick={this.handleToogle}>Cancel</button>);
        }
        return (<button id="btnAddNewTask" disabled={this.props.tabSelected === 1} type="button" className="btn btn-success btn-block" onClick={this.handleToogle}>Add new task</button>);	
    }

    render() {
        let button = this.generateAddButton();
        return (
            <div className="row">
              <Search onClickSearch={this.props.onClickSearch} />
                {/* SORT AREA */}	
              <Sort onClickSort={this.props.onClickSort} />
                {/* ADD NEW TASK BUTTON */}
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">		
                    { button }	
                </div>
            </div>
        );
    }
}

export default Control;