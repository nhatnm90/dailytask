import React, { Component } from 'react';
import _ from 'lodash';
import Title from './Title'
import Tabs from './control/Tabs'
import Control from './control/Control'
import Form from './control/Form'
import TaskList from './gridData/TaskList'
import ConfirmModal from './control/ConfirmModal'
import { taskService } from '../services';
import TaskModal from './control/TaskModal';
import Paginate from './control/Paginate'
class TodoList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            inputSearch: '',
            isShowAddForm: false,
            sortName: 'priority',
            sortDir: 'desc',
            itemSelected: null,
            showModal: false,
            deletedItem: null,
            tabSelected: 0,
            showLoading: false,
            page: 1,
            pageSize : 10,
            totalPage: 0    
        };

        this.openFormModal = this.openFormModal.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleBindingSelectedItem = this.handleBindingSelectedItem.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleOpenConfirmModal = this.handleOpenConfirmModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    openFormModal() {
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
        taskService.delete(id).then(() => {
            this.getArchiveTaskFromDB();
        });
    }

    archiveItem(id) {
        taskService.archive(id).then(() => {
            this.getCurrentTaskFromDB();
        });
    }

    handleDeleteItem(id, isForeDelete) {
        this.setState({ showLoading: true });
        if (this.state.tabSelected === 0) {
            isForeDelete ?  this.deleteItem(id) : this.archiveItem(id);
        } else if (this.state.tabSelected === 1) {
            this.deleteItem(id);
        }
        this.handleCloseModal();
    }

    handleAddTask(task, callback) {
        const addTask = _.assign({}, { ...task }, { isDone: false });
        taskService.insert(addTask).then(() => {
            this.getCurrentTaskFromDB();
            callback();
        })
    }

    handleEditTask(task, callback) {
        taskService.update(task).then(() => {
            this.getCurrentTaskFromDB();
            callback();
        });
    }

    handleBindingSelectedItem(itemSelected) {
        this.setState({ itemSelected, isShowAddForm: true });
    }

    getCurrentTaskFromDB () {
        taskService.getAll()
            .then(data => {
                this.setState({
                    items: data,
                    isShowAddForm: false,
                    showLoading: false,
                    totalPage: this.calculateTotalPage(data.length)
                });
            });
    }

    getArchiveTaskFromDB () {
        taskService.getArchive()
            .then(data => {
                this.setState({
                    items: data,
                    isShowAddForm: false,
                    showLoading: false,
                    totalPage: this.calculateTotalPage(data.length)
                });
            });
    }

    calculateTotalPage(numberOfItems) {
        return Math.floor(numberOfItems/this.state.pageSize) + (numberOfItems % this.state.pageSize > 0 ? 1 : 0);
    }

    componentWillMount() {
        this.setState({ showLoading: true });
        this.getCurrentTaskFromDB();
    }

    handleChangeTab(tabSelected) {
        this.setState({ showLoading: true });
        if (tabSelected === 0) {
            this.getCurrentTaskFromDB();
        } else if (tabSelected === 1) {
            this.getArchiveTaskFromDB();
        }
        this.setState({
            tabSelected,
            page: 1
        });
    }

    handleChangePage(event, page) {
        this.setState({ page });
    }

    getItemsByPaging(items, page, pageSize) {
        let startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        let listIndex = [];
        while (startIndex < endIndex) {
            listIndex.push(startIndex);
            startIndex += 1;
        }
        return items.filter((item, i) => {
            return listIndex.includes(i);
        })
    }

    render() {
        let addForm = null;

        let { isShowAddForm, items, sortDir, sortName, inputSearch, itemSelected,
            showModal, deletedItem, tabSelected, listName, listStyle, showLoading,
            page, pageSize } = this.state;

        items = inputSearch.length > 0 ? items.filter(i => _.includes(_.toLower(i.taskName), _.toLower(inputSearch))) : items;
        items = _.orderBy(items,[sortName],[sortDir]);

        items = this.getItemsByPaging(items, page, pageSize);

        let taskList = null;

        return (
            <div>
                <Title />
                <Tabs tabSelected={this.state.tabSelected} onChangeTab={this.handleChangeTab} />
                <Control
                    onClick = {this.openFormModal}
                    isShowAddForm = {isShowAddForm}
                    onClickSearch = {this.handleSearch}
                    onClickSort = {this.handleSort}
                    tabSelected={tabSelected}
                />
                <TaskList
                    editItem={this.handleBindingSelectedItem}
                    openConfirmModal={this.handleOpenConfirmModal}
                    items={items}
                    tabSelected={tabSelected}
                    listName={listName}
                    listStyle={listStyle}
                    showLoading={showLoading}
                />
                <Paginate
                    count={this.state.totalPage}
                    color="standard"
                    handleChange={this.handleChangePage}
                />
                
                <ConfirmModal
                    tabSelected={tabSelected}
                    show={showModal} deletedItem={deletedItem ?? {}}
                    handleCloseModal={this.handleCloseModal}
                    handleDeleteItem={this.handleDeleteItem} />
                <TaskModal
                    show={isShowAddForm}
                    itemSelected={itemSelected}
                    onAddTask={this.handleAddTask}
                    onEditTask={this.handleEditTask}
                    onClickCancel={this.openFormModal}
                    tabSelected={tabSelected}
                />
            </div>
        );
    }
}

export default TodoList;
