import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'

class ConfirmModal extends Component {

  confirm(id) {
    this.props.handleDeleteItem(id);
  }

  render() {
    const { show, deletedItem: { taskName, id } } = this.props;
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
          Mark <b>{ taskName }</b> as done?
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