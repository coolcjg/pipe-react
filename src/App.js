import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './view/main';
import LoginForm from './view/loginForm';

import List from './view/list';
import Write from './view/write';
import View from './view/view';
import Modify from './view/modify';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/loginForm" element={<LoginForm />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/view" element={<View />}></Route>
          <Route path="/modify" element={<Modify />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
