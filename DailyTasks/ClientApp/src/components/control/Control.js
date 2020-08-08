import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'

class Control extends Component {

    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.generateAddButton = this.generateAddButton.bind(this);
    }

    handleToggle() {
        this.props.onClick();
    }

    generateAddButton() {
        if (this.props.isShowAddForm) {
            return (<button type="button" className="btn btn-default btn-block" onClick={this.handleToggle}>Cancel</button>);
        }
        return (<button id="btnAddNewTask" disabled={this.props.tabSelected === 1} type="button" className="btn btn-pink-1 btn-block" onClick={this.handleToggle}>
            <i className="fa fa-plus" aria-hidden="true" /> Task
        </button>);	
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