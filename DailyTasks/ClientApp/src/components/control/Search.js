import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);

        console.log('constructor');

        this.state = {
            inputSearch: ''
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 

    handleClick() {
        this.props.onClickSearch(this.state.inputSearch);
    }

    handleClear() {
        this.setState({ inputSearch: '' });
        this.props.onClickSearch('');
    }

    handleChange(event) {
        this.setState({ inputSearch: event.target.value });
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mb-4">
                <div className="input-group">
                    <input id="txtSearch" value={this.state.inputSearch} onChange={this.handleChange} type="text" className="form-control" placeholder="..." aria-label="Recipient's username with two button addons" aria-describedby="button-addon4" />
                    <div className="input-group-append" id="button-addon4">
                        <button id="btnSearch" onClick={this.handleClick} className="btn btn-outline-secondary" type="button">Search</button>
                        <button id="btnClear" onClick={this.handleClear} className="btn btn-outline-secondary" type="button">Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;