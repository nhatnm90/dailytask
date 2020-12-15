import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import _, {get, isEmpty, parseInt} from "lodash";
import Validator from '../../utils/validator';

const uuidv4 = require('uuid/v4')

class TaskModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            taskName: '',
            priority: -1,
            comment: '',
            isLoadingButton: false,
            errors: {}
        };

        const checkPrioritySelected = (value, field, state) => {
            return parseInt(state[field]) !== -1;
        }
        const rules = [
            {
                field: 'taskName',
                method: 'isEmpty',
                validWhen: false,
                message: 'The taskName is required.'
            },
            {
                field: 'priority',
                method: checkPrioritySelected,
                args: ['priority'],
                validWhen: true,
                message: 'The priority must be selected.',
            }
        ];
        this.validator = new Validator(rules);
        
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
    }

    componentWillMount() {
        const id = get(this.props, 'itemSelected.id', '');
        if (!isEmpty(id)) {
            const { taskName, priority, comment } = get(this.props, 'itemSelected', {});
            this.setState({
                id, taskName, priority, comment
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== null) {
            const itemSelected = _.get(nextProps, 'itemSelected');
            if (itemSelected !== null) {
                const { id, taskName, priority, comment } = itemSelected;
                this.setState({
                    id, taskName, priority, comment
                });
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const errors = this.validator.validate(this.state);
        if (_.isEmpty(errors)) {
            this.setState({
                isLoadingButton: true
            });
            const { id, taskName, priority, comment } = this.state;
            if (isEmpty(id)) {
                this.props.onAddTask({ taskName, priority: parseInt(priority), id: uuidv4(), comment }, () => {
                    this.handleCancel();
                });
            } else {
                this.props.onEditTask({ taskName, priority: parseInt(priority), id, comment }, () => {
                    this.handleCancel();
                });
            }
        } else {
            this.setState({ errors });
        }
    }

    handleCancel() {
        this.setState({
            id: '',
            taskName: '',
            priority: -1,
            comment: '',
            isLoadingButton: false,
            errors: {}
        });
        this.props.onClickCancel();
    }

    handleInputChange(event) {
        // const errors = this.validator.validate(this.state);
        const { target: { name, value } } = event;
        this.setState({
            [name]: value,
            errors: this.validator.validate(this.state)
        });
    }
    
    handleInputOnBlur() {
        this.setState({ errors: this.validator.validate(this.state) });
    }
    
    render() {
        const isEnable = this.props.tabSelected === 0;
        const { taskName, priority, comment, isLoadingButton, errors } = this.state;
        return (
            <Modal
            backdrop='static'
            show={this.props.show}
            animation={false}
            onHide={this.props.onClickCancel}
            size="md"
            aria-labelledby="contained-modal-title-center"
            centered
            backdropClassName='modalCustom'
            >
                <Modal.Header closeButton={this.handleCancel}>
                    <Modal.Title>Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="txtTaskName">Task name<span className='required'>*</span></label>
                            <input disabled={!isEnable}
                                   id="txtTaskName"
                                   name="taskName"
                                   type="text"
                                   className={errors.taskName ? "form-control error" : "form-control"}
                                   value={taskName}
                                   onChange={this.handleInputChange}
                                   onBlur={this.handleInputOnBlur}
                            />
                            {errors.taskName && <div className="validation" style={{display: 'block'}}>{errors.taskName}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ddlPriority">Priority<span className='required'>*</span></label>
                            <select disabled={!isEnable}
                                    id='ddlPriority'
                                    name="priority"
                                    value={parseInt(priority)}
                                    className={errors.priority ? "form-control error" : "form-control"}
                                    required="required"
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputOnBlur}
                            >
                                <option value={-1}>--</option>
                                <option value={0}>Low</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
                            </select>
                            {errors.priority && <div className="validation" style={{display: 'block'}}>{errors.priority}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="textAreaComment">Comment</label>
                            <textarea disabled={!isEnable}
                                      name="comment"
                                      className="form-control"
                                      id="textAreaComment"
                                      rows={4}
                                      onBlur={this.handleInputOnBlur}
                                      onChange={this.handleInputChange}
                                      value={comment} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    { isEnable &&
                    (!isLoadingButton ?
                            <button id='btnSubmitTask'
                                    type="submit"
                                    onClick={this.handleSubmit}
                                    className="btn btn-pink-1 submit-form"
                                    disabled={!_.isEmpty(this.state.errors)}
                            >
                                Submit
                            </button> :
                            <button className="btn btn-pink-1 submit-form" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                                Submitting...
                            </button>
                    )
                    }
                    <button className='btn btn-outline-secondary' onClick={this.handleCancel}>Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default TaskModal;