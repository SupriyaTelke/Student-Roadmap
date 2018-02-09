import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Student from './Student';

const studentprop=[
    {id:1 , name:'Mickel', percentage:36.5 , avatar:'./images/Mickel.jpg'},
    {id:2 , name:'Elin', percentage:56 , avatar:'./images/Elin.jpg'},
    {id:3 ,name:'Oda', percentage:70.5, avatar:'./images/Oda.jpg' },
];

const chapter=[
    {id:1, title:'JSX'},
    {id:2, title:'Component'},
    {id:3, title:'props and state'},
    {id:4, title:'Lifecycle'},
    {id:5, title:'List and Form'},
];
ReactDOM.render(<Student studentprop={studentprop} chapter={chapter}/>, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
