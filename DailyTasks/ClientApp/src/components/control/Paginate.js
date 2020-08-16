import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

class Paginate extends Component {
    
    render() {
        return (
            <div className='lalala'>
                <Pagination
                    count={this.props.count}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

export default Paginate;