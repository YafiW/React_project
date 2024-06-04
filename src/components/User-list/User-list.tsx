import React, { FC, useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import './User-list.scss';
import usersservice from '../../services/users.service';
import usersModel from '../../models/userModel'
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loadder from '../Loadder/Loadder';
import UserDetails from '../User-details/User-details';
import MyModal from '../My-modal/My-modal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserPosts from '../UserPosts/UserPosts';

interface UserListProps { }

const UserList: FC<UserListProps> = () => {
  const searchRef = useRef<any>()
  let [listUsers, setListUsers] = useState<usersModel[]>([])
  const [isPostsDisplay, setPostsDisplay] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isModalDisplay, setisModalDisplay] = useState(false);
  const [isModalPostDisplay, setisModalPostDisplay] = useState(false);
  const [currentUser, setCurrentUser] = useState<usersModel>(new usersModel(0, " ", " ", " "));
  const [listUsersFilter, setlistUsersFilter] = useState<usersModel[]>(listUsers);
  useEffect(() => {
    loadItems();
  }, [])

  const navigate = useNavigate()


  const loadItems = () => {
    setIsDisplay(true);
    usersservice.getListUsers().then((res) => {
      listUsers = res.data.map((user: any) => {
        return new usersModel(user.id, user.name, user.username, user.email);
      });
      setListUsers(listUsers);
      setIsDisplay(false);
      setlistUsersFilter([...listUsers]);
    })
  }

  const DeleteUser = () => {
    usersservice.deleteUser(currentUser.id).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        // const indexToRemove = listUsers.findIndex((user) => user.id === currentUser.id);
        // if (indexToRemove !== -1) {
        //   const updatedUsers = [...listUsers];
        //   updatedUsers.splice(indexToRemove, 1);
        //   setListUsers(updatedUsers);
        //   setlistUsersFilter([...updatedUsers]);
        // } 
        alert("Success")
      }
      else {
        alert("The deletion failed")
      }
    })
  }

  const getUserPosts = (id: any) => {
    usersservice.getUserPosts().then((res) => {
      const fetchedPosts = res.data.filter((p: any) => p.userId === id);
      setUserPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      setPostsDisplay(true);
        navigate('/user-posts', { state: { userPosts: [...userPosts, ...fetchedPosts] } });});
  };

  const AddUser = (user: usersModel) => {
    listUsers.push(user)
    setListUsers([...listUsers]);
    setlistUsersFilter([...listUsers]);
  }

  const searchUser = () => {
    let searchValue = searchRef.current.value;
    setlistUsersFilter(listUsers.filter((item) => {
      const nameArray = item.name.split(' ');
      let firstName = nameArray[0];
      return firstName.includes(searchValue);
    }));
  }
  const funcSetIsDisplay = () => {
    setisModalDisplay(false);

  }

  const funcSetModaPostlDisplay = () => {
    setisModalPostDisplay(false);

  }

  return <div className="container-fluid">
    <h1 className='mt-10'>Welcome to my users web!</h1>
    <div className='row'>
      <div className='col-md-6 '>
        <UserDetails AddUser={AddUser}></UserDetails>
      </div>
      <div className="col-md-6">
        <div className='form-group '>
          <label></label>
          <input placeholder="Search user" ref={searchRef} onBlur={searchUser} className='form-control'></input>
        </div>
        {isDisplay ? <Loadder></Loadder> : ''}
        <table className="table table-striped" >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">User name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {listUsersFilter.map((user, index) => (
              <tr key={index}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <button className='btn btn-warning mt-2' onClick={() => {
                  setCurrentUser(new usersModel(user.id, user.name, user.username, user.email));
                  setisModalDisplay(true);
                }}>Delete user</button>
                <button className='btn btn-warning mt-2' onClick={() => {
                  navigate(`/full-user-detailes/${user.id}`);
                }}>Show full detailes</button>
                <button className='btn btn-warning mt-2' onClick={() => {
                  setCurrentUser(new usersModel(user.id, user.name, user.username, user.email));
                  setisModalPostDisplay(true);
                }}>Show user posts</button>

              </tr>
            ))}
          </tbody>
        </table>
        {isModalDisplay ? (
          <MyModal currentFunction={DeleteUser} title="Delete User" funcSetIsDisplay={funcSetIsDisplay}>
            <p>Are you sure you want to delete the {currentUser.name}?</p>
          </MyModal>
        ) : null}
        {isModalPostDisplay ? (
          <MyModal currentFunction={() => { getUserPosts(currentUser.id) }} title="User posts" funcSetIsDisplay={funcSetModaPostlDisplay}>
            <p>Do you want to see {currentUser.name} posts?</p>
          </MyModal>
        ) : null}
      </div>
    </div>
    <Outlet></Outlet>
  </div>
};

export default UserList;
