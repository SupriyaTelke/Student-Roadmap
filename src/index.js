import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Student from './Student';

const studentprop=[
    {id:1 , name:'Mickel', percentage:50 , avatar:'./images/Mickel.jpg'},
    {id:2 , name:'Elin', percentage:33 , avatar:'./images/Elin.jpg'},
    {id:3 ,name:'Oda', percentage:38, avatar:'./images/Oda.jpg' },
    {id:4 ,name:'Leaha', percentage:75, avatar:'./images/Oda.jpg' },
];

const chapter=[
    {id:1, title:'JSX'},
       {id:2, title:'Components'},
      {id:3, title:'props and state'},
       {id:4, title:'Lifecycle'},
        {id:5, title:'List and Form'},
       {id:6, title:'events'},
       {id:7, title:'chapter7'},
        {id:8, title:'chapter8'},
        {id:9, title:'chapter9'},
        {id:10, title:'chapter10'},
     {id:11, title:'chapter11'},
      {id:12, title:'chapter12'},
      {id:13, title:'chapter13'},
];
ReactDOM.render(<Student studentprop={studentprop}  chapter={chapter} orientation={'horizontal'} />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
