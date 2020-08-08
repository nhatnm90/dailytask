import React, { Component } from 'react';
import { constants } from '../../utils/constant';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            taskName: '',
            priority: 0
        };
        
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    handleChangeTab(index) {
        console.log(`Tab ${index} was selected`);
    }
    
    buildMenu(tabSelected, onChangeTab) {
      return constants.TABS .map((item) => {
        const { name, index } = item;
        const className = index === tabSelected ? 'nav-link active' : 'nav-link';
        return <li key={index} className='nav-item'>
            <a href='/#' className={className} onClick={() => this.props.onChangeTab(index)}>{name}</a></li>
      });
    }

    render() {
        const { tabSelected } = this.props;
        const menu = this.buildMenu(tabSelected);
        return (
            <ul className="nav nav-tabs">
                {menu}
            </ul>
        );
    }
}

export default Tabs;