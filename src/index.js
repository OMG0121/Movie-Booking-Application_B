import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './screens/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './screens/details/Details';

ReactDOM.render(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/details/:id" element={<Details/>} />
            </Routes>
        </BrowserRouter>
, document.getElementById('root'));