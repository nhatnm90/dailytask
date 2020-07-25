import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import qs from 'qs';
import Title from './components/todoList/Title'
import Control from './components/todoList/Control/Control'
import Form from './components/todoList/Form'
import TaskList from './components/todoList/TaskList'
import ConfirmModal from './components/todoList/Control/ConfirmModal'
// import mockItems from './mockData/tasks'

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            items: [],
            inputSearch: '',
            isShowAddForm: false,
            sortName: 'level',
            sortDir: 'desc',
            itemSelected: null,
            showModal: false,
            deletedItem: null
        };

        this.handleToogleAddForm = this.handleToogleAddForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleBindingSelectedItem = this.handleBindingSelectedItem.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleOpenConfirmModal = this.handleOpenConfirmModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    handleToogleAddForm() {
        this.setState({
            itemSelected: null,
            isShowAddForm: !this.state.isShowAddForm
        });
    }

    handleSearch(inputSearch) {
        this.setState({ inputSearch });
    }

    handleSort(sortName, sortDir) {
        this.setState({ sortName, sortDir });
    }

    handleOpenConfirmModal(deletedItem) {
        this.setState({ showModal: true, deletedItem })
    }

    handleCloseModal() {
        this.setState({ showModal: false })
    }

    deleteItem(id) {
        let { items } = this.state;
        _.remove(items, i => i.id === id);
        this.setState({ items, deleteItem: null });

        localStorage.setItem('items', JSON.stringify(items));
    }

    handleDeleteItem(id) {
        this.deleteItem(id);
        this.handleCloseModal();
    }


    handleAddTask(task) {
        // let { items } = this.state;
        // items.push(task);
        // this.setState({ items, isShowAddForm: false });
        //
        // localStorage.setItem('items', JSON.stringify(items));
        const addTask = _.assign({}, { ...task }, { isDone: false });

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(addTask),
            url: 'http://localhost:5000/task/insert',
        };
        axios(options);
        this.getData(false);
        // axios.post('http://localhost:5000/task/insert', { addTask })
        //     .then(res => {
        //         this.getDataFromDB();
        //         console.log(res);
        //         console.log(res.data);
        //     })
    }

    handleEditTask(task) {
        let { items } = this.state;
        _.remove(items, i => i.id === task.id);
        items.push(task);
        this.setState({ items, isShowAddForm: false });

        localStorage.setItem('items', JSON.stringify(items));
    }

    handleBindingSelectedItem(itemSelected) {
        this.setState({ itemSelected, isShowAddForm: true });
    }

    async getData(isShowAddForm) {
        const response = await fetch('task');
        const items = await response.json();
        !_.isUndefined(isShowAddForm) ? this.setState({ items, isShowAddForm }) : this.setState({ items });
    }
    
    getDataFromDB () {
        axios.get('http://localhost:5000/task')
            .then(res => {
                const items = res.data;
                this.setState({ items });
            })
            .catch(error => console.log(error));
    }

    componentWillMount() {
        this.getData();
        // this.populateTaskData();
        //const dataFromLocalStorage = JSON.parse(localStorage.getItem('items'));
        //this.setState({ items: dataFromLocalStorage ?? [] });
    }

    componentDidMount() {
    }

    render() {
        let addForm = null;

        let { isShowAddForm, items, sortDir, sortName, inputSearch, itemSelected, showModal, deletedItem } = this.state;
        if (isShowAddForm) {
            addForm = <Form itemSelected={itemSelected} onAddTask={this.handleAddTask} onEditTask={this.handleEditTask} onClickCancel={this.handleToogleAddForm} />;
        }

        items = inputSearch.length > 0 ? items.filter(i => _.includes(_.toLower(i.name), _.toLower(inputSearch))) : items;
        items = _.orderBy(items,[sortName],[sortDir]);

        return (
            <div>
                <Title />
                <Control
                    onClick = {this.handleToogleAddForm}
                    isShowAddForm = {isShowAddForm}
                    onClickSearch = {this.handleSearch}
                    onClickSort = {this.handleSort}
                />
                { addForm }
                <TaskList editItem={this.handleBindingSelectedItem} openConfirmModal={this.handleOpenConfirmModal} items={items}/>
                <ConfirmModal show={showModal} deletedItem={deletedItem ?? {}} handleCloseModal={this.handleCloseModal} handleDeleteItem={this.handleDeleteItem} />
            </div>
        );
    }
}

export default TodoList;
