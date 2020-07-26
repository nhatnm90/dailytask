import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Introduce from './Introduce';
import TodoList from './TodoList';
// import ModalExample from './ModalExample';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <TodoList />,
  document.getElementById('root')
);

serviceWorker.unregister();
