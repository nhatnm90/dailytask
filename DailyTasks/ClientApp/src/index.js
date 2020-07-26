import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import TodoList from './TodoList';

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);

registerServiceWorker();

