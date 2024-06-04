import React, { FC,ReactNode } from 'react';
import './LogIn.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { json } from 'stream/consumers';
import usersModel from '../../models/userModel';


interface LogInProps { }

const LogIn: FC<LogInProps> = () => {
   const navigate = useNavigate(); 
   const userform = useFormik({
     initialValues: {
       Email: "",
       Password: ""
     },
     onSubmit: (valueForm: any, { resetForm }) => {
       resetForm({
         values: {
           Password: '',
           Email: '',
         },
       });
       navigate('/user-detailes');
     },
     validationSchema: Yup.object().shape({
       Email: Yup.string().required().email('Invalid email address'),
       Password: Yup.string().required().min(2, 'Password must be at least 2 characters long'),
     })
   });
   
const goToUserList = () =>{
  navigate('/user-list');

}
return (
  <div className='My_Form'>
    <h2>Log in</h2>
    <form onSubmit={userform.handleSubmit}>
      <div className='form-group mt-3'>
        <label>Email:</label>
        <input value={userform.values.Email} name='Email' onChange={userform.handleChange} className={userform.errors.Email ? 'form-control is-invalid' : 'form-control'} />
        {typeof userform.errors.Email === 'string' ? (
          <small>{userform.errors.Email}</small>
        ) : null}
      </div>
      <div className='form-group mt-3'>
        <label>Password:</label>
        <input value={userform.values.Password} name='Password' onChange={userform.handleChange} className={userform.errors.Password ? 'form-control is-invalid' : 'form-control'} />
        {typeof userform.errors.Password === 'string' ? (
          <small>{userform.errors.Password}</small>
        ) : null}
      </div>
      <div className="button-container">
        <button type='submit' className='btn btn-warning'>Log In</button>
        <button onClick={goToUserList} className='btn btn-warning'>User list</button>
      </div>
    </form>
    <Outlet></Outlet>
  </div>
);

};

export default LogIn; 
