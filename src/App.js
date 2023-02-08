import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './view/main';

import Write from './view/write';
import List from './view/list';
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/write" element={<Write />}></Route>
          <Route path="/list" element={<List />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
