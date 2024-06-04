import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User-list/User-list';
import Loadder from './components/Loadder/Loadder';
import UserDetails from './components/User-details/User-details';
import { Route, Routes } from 'react-router-dom';
import FullUserDetailes from './components/FullUserDetailes/FullUserDetailes';
import UserPosts from './components/UserPosts/UserPosts';
import LogIn from './components/LogIn/LogIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<LogIn></LogIn>}></Route>
        <Route path='/user-detailes' element={<UserDetails AddUser={() => {
          console.log("Ok")
        }}></UserDetails>}></Route>
        <Route path='/user-list' element={<UserList></UserList>}></Route>
        <Route path='/full-user-detailes/:id' element={<FullUserDetailes></FullUserDetailes>} />
        <Route path='/user-posts' element={<UserPosts></UserPosts>} />
      </Routes>
    </div>
  );
}

export default App;
