import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { App } from "./App";


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);