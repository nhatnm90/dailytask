import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isForceDelete: false
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { target: { name, checked } } = event;
        this.setState({
            [name]: checked
        });
    }
    
    render() {
    const { show, deletedItem: { taskName, id }, tabSelected }  = this.props;
    let confirmMessage = null;
    if (tabSelected === 0) {
        confirmMessage = (<p>Mark <b>{ taskName }</b> as done?</p>);
    } else if (tabSelected === 1) {
        confirmMessage = (<p>Are you sure to delete <b>{ taskName }</b>?</p>);
    }
    return (
      <Modal
        backdrop='static'
        show={show}
        animation={false}
        onHide={this.props.handleCloseModal}
        size="md"
        aria-labelledby="contained-modal-title-center"
        centered
        backdropClassName='modalCustom'
        >
        <Modal.Header closeButton={this.props.handleCloseModal}>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    {confirmMessage}
                </div>
                { this.props.tabSelected === 0 && (
                    <div className="form-check cb-container">
                        <label className="form-check-label" htmlFor="cbForceDelete"><i>mark to delete task</i>
                            <input name="isForceDelete"
                                   type="checkbox"
                                   className="form-check-input"
                                   id="cbForceDelete"
                                   onChange={this.handleInputChange}
                                   checked={ this.state.isForceDelete ? 'checked' : '' }
                            />
                            <span className="checkmark" />
                        </label>
                    </div>)
                }
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button className='btn btn-outline-secondary' onClick={this.props.handleCloseModal}>Cancel</button>
            <button className='btn btn-pink-1' onClick={() => this.props.handleDeleteItem(id, this.state.isForceDelete)}>OK</button>
        </Modal.Footer>
    </Modal>
    );
  }
}

export default ConfirmModal;