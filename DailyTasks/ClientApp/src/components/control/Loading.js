import React, { Component } from 'react';
import { constants } from '../../utils/constant';

class Loading extends Component {
    render() {
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading;