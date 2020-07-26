import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'

class Control extends Component {

    constructor(props) {
        super(props);

        this.handleToogle = this.handleToogle.bind(this);
        this.genetateAddButton = this.genetateAddButton.bind(this);
    }

    handleToogle() {
        this.props.onClick();
    }

    genetateAddButton() {
        if (this.props.isShowAddForm) {
            return (<button type="button" className="btn btn-default btn-block" onClick={this.handleToogle}>Cancel</button>);
        }
        return (<button id="btnAddNewTask" type="button" className="btn btn-info btn-block" onClick={this.handleToogle}>Add new task</button>);	
    }

    render() {
        let button = this.genetateAddButton();
        return (
            <div className="row">
              <Search onClickSearch={this.props.onClickSearch} />
                {/* SORT AREA */}	
              <Sort onClickSort={this.props.onClickSort} />
                {/* ADD NEW TASK BUTTON */}
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">		
                    { button }	
                    {/* {this.showControllButton} */}
                    {/* <button type="button" className="btn btn-info btn-block" onClick={this.props.onClick}>Add new task</button>				 */}
                </div>
              </div>
        );
    }
}

export default Control;