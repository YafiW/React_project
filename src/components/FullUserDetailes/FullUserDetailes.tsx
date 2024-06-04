import React, { FC, useEffect, useState } from 'react';
import usersservice from '../../services/users.service';
import UsersFullModel from '../../models/userFullModel'
import './FullUserDetailes.scss';
import { Outlet, Link, useNavigate, useParams, useLocation } from 'react-router-dom'

interface FullUserDetailesProps { }

const FullUserDetailes: FC<FullUserDetailesProps> = () => {
  const id = useParams();
  const [userDetails, setuserDetailes] = useState<UsersFullModel>();
  const navigate = useNavigate()

  useEffect(() => {
    loadItems();
  }, [id]);

  const BackToUsersComp = () => {
    navigate('/user-list');
  }

  const loadItems = () => {
    usersservice.getFullUserDetailes(id).then((res) => {
      const userFullDetailes = new UsersFullModel(
        res.data.id,
        res.data.name,
        res.data.username,
        res.data.email,
        res.data.address.street,
        res.data.address.suite,
        res.data.address.city,
        res.data.address.zipcode,
        res.data.address.geo.lat,
        res.data.address.geo.lng,
        res.data.phone,
        res.data.website,
        res.data.company.name,
        res.data.company.catchPhrase,
        res.data.company.bs
      );
      setuserDetailes(userFullDetailes);
    });
  };

  return (
    <div className="centered">
      {userDetails && (
        <div className="card-wrapper">
          <div className="FullUserDetails card">
            <div className="card-img-wrapper">
              <img src={require('../../images/man.png')} className="card-img-top center quarter-size" alt="Contacts Book" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{userDetails.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><span className="highlight">The Id is:</span> {userDetails.id}</li>
              <li className="list-group-item"><span className="highlight">The userName is:</span> {userDetails.username}</li>
              <li className="list-group-item"><span className="highlight">The email is:</span> {userDetails.email}</li>
              <li className="list-group-item"><span className="highlight">The addresses are:</span> {userDetails.address.street} {userDetails.address.suite}, {userDetails.address.city} {userDetails.address.zipcode}<br></ br>{userDetails.address.geo.lat}, {userDetails.address.geo.lng}</li>
              <li className="list-group-item"><span className="highlight">The phone is:</span> {userDetails.phone}</li>
              <li className="list-group-item"><span className="highlight">The website is:</span> {userDetails.website}</li>
              <li className="list-group-item"> <span className="highlight">The company is:</span> {userDetails.company.name}, {userDetails.company.catchPhrase}, {userDetails.company.bs}</li>
            </ul>
            <div className="card-body">
              <button onClick={BackToUsersComp} className='btn btn-warning mt-2'>Back to users list</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FullUserDetailes;

