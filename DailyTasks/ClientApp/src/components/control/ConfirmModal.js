import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'

class ConfirmModal extends Component {

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
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdropClassName='modalCustom'
        >
        <Modal.Header closeButton={this.props.handleCloseModal}>
            <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {confirmMessage}
        </Modal.Body>
        <Modal.Footer>
            <Button variant='outline-info' onClick={this.props.handleCloseModal}>Cancel</Button>
            <Button variant='success' onClick={() => this.props.handleDeleteItem(id)}>OK</Button>
        </Modal.Footer>
    </Modal>
    );
  }
}

export default ConfirmModal;