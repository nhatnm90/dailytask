import React, { Component } from 'react';

class Tabs extends Component {
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

    buildMenu() {
      const currentTab =  window.location.pathname
      const menu = [ 
        { name: "Current", path: '/'},
        { name: "Archive", path: '/archive'}
      ];

      return menu.map((item, index) => {
        const { name, path } = item;
        const className = path === currentTab ? 'active' : '';
        return <li key={index} role='presentation' className={className}><a href={path}>{name}</a></li>
      });
    }

    render() {
        const menu = this.buildMenu();
        return (
          <ul className="nav nav-tabs">
            {menu}
          </ul>
        );
    }
}

export default Tabs;